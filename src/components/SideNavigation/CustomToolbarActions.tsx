import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { styled, alpha } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import { createTheme, useColorScheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Popover from '@mui/material/Popover';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Notification from './Notification';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



const CustomToolbarActions: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(null);

  const { setMode } = useColorScheme();
  
  const handleThemeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMode(event.target.value as 'light' | 'dark' | 'system');
    },
    [setMode],
  );
  const handleThemeSwitch = () => {
    // Logic for switching theme (light/dark mode)
    console.log('Theme switcher clicked');
  };

  const toggleMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setMenuAnchorEl(isMenuOpen ? null : event.currentTarget);
      setIsMenuOpen((previousIsMenuOpen) => !previousIsMenuOpen);
    },
    [isMenuOpen],
  );
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* Search Bar */}
      <Stack direction="row">
        <Tooltip title="Search" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: 'inline', md: 'none' },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Tooltip>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
        />
<Notification /> 
      {/* Theme Switcher Icon */}
      
      <React.Fragment>
        <Tooltip title="Settings" enterDelay={1000}>
          <div>
            <IconButton type="button" aria-label="settings" onClick={toggleMenu}>
              <SettingsIcon />
            </IconButton>
          </div>
        </Tooltip>
        <Popover
          open={isMenuOpen}
          anchorEl={menuAnchorEl}
          onClose={toggleMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          disableAutoFocus
        >
          <Box sx={{ p: 2 }}>
            <FormControl>
              <FormLabel id="custom-theme-switcher-label">Theme</FormLabel>
              <RadioGroup
                aria-labelledby="custom-theme-switcher-label"
                defaultValue="system"
                name="custom-theme-switcher"
                onChange={handleThemeChange}
              >
                <FormControlLabel value="light" control={<Radio />} label="Light" />
                <FormControlLabel value="system" control={<Radio />} label="System" />
                <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Popover>
      </React.Fragment>
      </Stack>
    </Box>
    
  );
};

export default CustomToolbarActions;
