package com.quiz.quizapp.config;

import com.quiz.quizapp.model.User;
import com.quiz.quizapp.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.quiz.quizapp.utils.*;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;


@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                FilterChain filterChain) throws ServletException, IOException {

    String path = request.getServletPath();
    if (path.startsWith("/api/auth") || path.startsWith("/v3/api-docs") || path.startsWith("/swagger")) {
        filterChain.doFilter(request, response);
        return;
    }

    String token = null;

    // ✅ Lire le JWT depuis le cookie "jwt"
    if (request.getCookies() != null) {
        for (var cookie : request.getCookies()) {
            if (cookie.getName().equals("jwt")) {
                token = cookie.getValue();
                break;
            }
        }
    }

    if (token != null) {
        String username = jwtUtil.extractUsername(token);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByEmail(username).orElse(null);

            if (user != null && jwtUtil.validateToken(token)) {
                Claims claims = jwtUtil.extractAllClaims(token);
                String role = claims.get("role", String.class);
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(user, null, List.of(authority));
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
    }

    filterChain.doFilter(request, response);
}

}
