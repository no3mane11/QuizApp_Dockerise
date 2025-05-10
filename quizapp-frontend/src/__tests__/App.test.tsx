import { render, screen } from '@testing-library/react';
import App from '../App';

test('affiche le message de bienvenue', () => {
  render(<App />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
