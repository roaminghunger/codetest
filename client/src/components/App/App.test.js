import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TodoContainer component', () => {
  render(<App />);
  const linkElement = screen.getByTestId('todo-container');
  expect(linkElement).toBeInTheDocument();
});
