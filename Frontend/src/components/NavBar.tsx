import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { styled } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoImg from '../assets/images/logo.svg';
import SearchBar from './SearchBar';

const Logo = styled('img')(({ theme }) => ({
  width: 60,
  height: 60,
  marginRight: theme.spacing(3),
}));

export default function NavBar() {
  return (

    <MuiAppBar position="static">
      <Toolbar>
        <Logo
          className="navbar-logo"
          src={LogoImg}
          alt="S-Mart shopping logo"
        />
        <Box display="flex" flex="1 1 auto" alignItems="center">
          <LocationOnOutlinedIcon />
          <Box ml={1}>
            <Typography fontSize={12}>Deliver to</Typography>
            <Typography fontSize={14} fontWeight={700}>
              Location
            </Typography>
          </Box>
        </Box>

        <SearchBar />

        <Box>Flag placeholder</Box>
        <Box>Account placeholder</Box>
        <Box>Returns & orders</Box>
        <Box>Cart placeholder</Box>
      </Toolbar>
    </MuiAppBar>

  );
}
