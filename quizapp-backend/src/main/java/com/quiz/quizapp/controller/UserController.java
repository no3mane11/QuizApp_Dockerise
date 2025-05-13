package com.quiz.quizapp.controller;

import java.util.*;
import com.quiz.quizapp.model.User;
import com.quiz.quizapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;


@PreAuthorize("isAuthenticated()")
@SecurityRequirement(name = "BearerAuth")

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 🔐 Autorisé uniquement pour utilisateurs authentifiés

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userRepository.findById(id);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    // 🔐 Autorisé pour les utilisateurs connectés

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setRole(updatedUser.getRole());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // 🔐 Supprimer uniquement si authentifié (ou change à hasRole('ADMIN') si tu veux restreindre)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
        return "User deleted successfully with id: " + id;
    }
}
