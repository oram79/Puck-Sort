import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the PuckSort landing page', () => {
  render(<App />);
  expect(screen.getByText('PuckSort')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /enter roster/i })).toBeInTheDocument();
});

test('enters the roster view after clicking the CTA', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /enter roster/i }));
  expect(screen.getByText('Player Roster')).toBeInTheDocument();
});
