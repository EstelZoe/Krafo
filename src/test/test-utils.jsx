import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

/**
 * Custom render function that wraps components with necessary providers
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - Render options
 * @returns {Object} - Render result
 */
export function renderWithRouter(ui, options = {}) {
  const { initialEntries = ['/'], ...renderOptions } = options;

  function Wrapper({ children }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing library
export * from '@testing-library/react';
