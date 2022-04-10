import { render, screen } from '@testing-library/react';
import App from './App';

test('Mostrar componente Clientes', () => {
  render(<App />);
  const componentClient = screen.getByText(/Clientes/i);
  expect(componentClient).toBeInTheDocument();
});
