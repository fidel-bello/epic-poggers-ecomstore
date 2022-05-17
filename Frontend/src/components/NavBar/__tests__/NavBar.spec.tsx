import { render } from '@testing-library/react';

import { NavBar } from '../NavBar';

describe('NavBar', () => {
  it('Should render', () => {
    render(<NavBar />);
  });
});
