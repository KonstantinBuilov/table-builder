import { render, screen } from '@testing-library/react';
import App from './App';

test('App elements', () => {
  render(<App />);
  const previewButton = screen.getByText(/Show Preview/i);
  expect(previewButton).toBeInTheDocument();

  const tableNameLabel = screen.getByText(/Table Name/i);
  expect(tableNameLabel).toBeInTheDocument();

  const AutogenLabel = screen.getByText(/Autogenerate Id/i);
  expect(AutogenLabel).toBeInTheDocument();

  const addButton = screen.getByText(/Add Column/i);
  expect(addButton).toBeInTheDocument();
});
