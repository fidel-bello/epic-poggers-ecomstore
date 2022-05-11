import { render } from '@testing-library/react';
import React from 'react';

import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('Should render', () => {
    render(<Navbar />);
  });
});
