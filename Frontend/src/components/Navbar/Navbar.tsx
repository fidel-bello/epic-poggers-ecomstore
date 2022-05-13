import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

import { SearchBar } from './components/SearchBar';
import LogoImg from '../../assets/images/logo.svg';

import './Navbar.css';

// const Logo = styled('span')(({ theme }) => ({
//   backgroundImage: `url(${LogoImg})`,
//   width: 97,
//   height: 30,
//   backgroundSize: 'cover',
//   marginRight: theme.spacing(4),
// }));

const LocationOnOutlinedIcon = styled('span')(() => ({
  backgroundImage: 'url("https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/nav-sprite-global-1x-hm-dsk-reorg._CB405937547_.png")',
  width: 15,
  height: 18,
  backgroundPosition: '-71px -378px',
}));

function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <img
            className="navbar-logo"
            src={LogoImg}
            alt="S-Mart shopping logo"
          />
          <Box display="flex" flex="1 1 auto" alignItems="flex-end" mb={1}>
            <LocationOnOutlinedIcon />
            <Box ml={1}>
              <Typography fontSize={12}>Deliver to</Typography>
              <Typography fontSize={14} fontWeight={700}>Location</Typography>
            </Box>
          </Box>
          <SearchBar />
          <Box>Flag placeholder</Box>
          <Box>Account placeholder</Box>
          <Box>Returns & orders</Box>
          <Box>Cart placeholder</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export { Navbar };
