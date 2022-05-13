import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const SearchBarRoot = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: theme.spacing(1),
}));

export default function SearchBar() {
  return (
    <SearchBarRoot display="flex" mx={2} width="100%">
      <FormControl sx={{ width: 80 }}>
        <Select id="product-category-select" size="small" value="all">
          <MenuItem value="all">All</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth variant="outlined" size="small" />
      <Box sx={{ backgroundColor: '#febd69' }}>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
    </SearchBarRoot>
  );
}
