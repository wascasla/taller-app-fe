import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ClientList } from './clientList';

const queryClient = new QueryClient();

test('Debe contener un boton Nuevo Cliente', () => {
  render(
    <QueryClientProvider client={queryClient}>

      <ClientList />
    </QueryClientProvider>
  );
  const button = screen.getByText(/Nuevo Cliente/i);
  expect(button).toBeInTheDocument();
});