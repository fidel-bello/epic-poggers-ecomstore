import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, styled, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';

const Logo = styled('span')(({ theme }) => ({
  backgroundImage: 'url("https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/nav-sprite-global-1x-hm-dsk-reorg._CB405937547_.png")',
  width: 97,
  height: 30,
  backgroundPosition: '-10px -51px',
  marginRight: theme.spacing(4),
}));

const LocationOnOutlinedIcon = styled('span')(() => ({
  backgroundImage: 'url("https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/nav-sprite-global-1x-hm-dsk-reorg._CB405937547_.png")',
  width: 15,
  height: 18,
  backgroundPosition: '-71px -378px',
}));

function SearchBar() {
  return (
    <Box display="flex" mx={2} width="100%" sx={{ backgroundColor: 'white' }}>
      <FormControl>
        <Select size="small" value="All">
          <MenuItem>All</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth variant="outlined" size="small" />
      <Box sx={{ backgroundColor: '#febd69' }}>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Logo />
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

export default Navbar;
