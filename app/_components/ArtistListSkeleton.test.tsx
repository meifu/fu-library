import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

import ArtistListSeleton from './ArtistListSkeleton';

describe('Component: Title', () => {
  it('render Title correctly', () => {
    const tree = renderer.create(<ArtistListSeleton />);
    expect(tree).toMatchSnapshot();
  });
});
