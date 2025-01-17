import { render, screen } from '@testing-library/react';
import App from './App';

test('renders fancy Hello, World! message', () => {
  render(<App />);
  const helloElement = screen.getByText(/Welcome to the Future of React! 🚀/i);
  expect(helloElement).toBeInTheDocument();
});
