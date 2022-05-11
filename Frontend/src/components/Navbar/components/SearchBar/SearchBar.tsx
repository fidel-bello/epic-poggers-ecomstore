import Box from '@mui/material/Box';
import { IconButton, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';

export function SearchBar() {
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
