import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Components: Header', () => {
  it('Should render Header with login status correctly', () => {
    render(<Header data={{ name: 'may', email: 'test@gmail.com' }} />);
    const artistRoute = screen.getAllByText('Artist');
    const songRoute = screen.getAllByText('Song');
    const logout = screen.getByText('Log Out');
    expect(artistRoute.length).toBe(2);
    expect(songRoute.length).toBe(2);
    expect(logout).toBeInTheDocument();
  });

  it('Should render Header without login', () => {
    render(<Header data={undefined} />);
    const artistRoute = screen.getAllByText('Artist');
    const songRoute = screen.getAllByText('Song');
    const login = screen.getByText('Log In');
    expect(artistRoute.length).toBe(2);
    expect(songRoute.length).toBe(2);
    expect(login).toBeInTheDocument();
  });
});
