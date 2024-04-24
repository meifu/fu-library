import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Component: Title', () => {
  it('render Title correctly', () => {
    render(<Title text="test title" variant="h1" />);

    const theTitle = screen.getByText('test title');
    expect(theTitle).toBeInTheDocument();
    expect(theTitle.nodeName).toBe('H1');
  });
});
