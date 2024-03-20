import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import GroupIcon from '@mui/icons-material/Group';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoIsc from '../assets/images/LogoIsc.svg';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function ResponsiveDrawer(props) {



  const navigate = useNavigate();

  const handleOnClick = (route) => {
    
    route === 'raffles'? navigate('/'+route) :navigate('/isc/' + route) 
    handleDrawerToggle();
  };


  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const drawer = (
    <Stack>
      <Box sx={{ m: '0 auto' }}>
        <Box
          onClick={() => handleRedirectClick('dashboard')}
          component="img"
          sx={{ cursor: "pointer", maxWidth: 200 }}
          alt="Logo Inverbautista Shopping Center"
          src={LogoIsc}
        />
      </Box>
      <Toolbar />

      <List >
        {[
          { text: 'Dashboard', icon: <HomeOutlinedIcon />, redirectPath: 'dashboard' }, 
          { text: 'Administrar eventos', icon: <BallotOutlinedIcon />, redirectPath: 'raffle' }, 
          { text: 'Administrar tickets', icon: <ConfirmationNumberOutlinedIcon />, redirectPath: 'ticket' }, 
          { text: 'Administrar clientes', icon: <GroupIcon />, redirectPath: 'client' },
          { text: 'Cerrar sesión', icon: <LogoutIcon />, redirectPath: 'raffles' }].map((btn) => (

          <Box key={btn.redirectPath}>
            <Divider />
            <ListItem sx={{ color: 'white' }}  disablePadding>
              <ListItemButton onClick={() => handleOnClick(btn.redirectPath)} sx={{ color: '' }}>
                {btn.icon}
                <ListItemText disableTypography primary={<Typography variant="p">{btn.text}</Typography>} />
              </ListItemButton>

            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>


    </Stack>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { md: "none" }
        }}
      >
        
        <Toolbar  >
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ borderRadius: 0, mr: 2, display: { md: 'none' }, flex: '0 0 20%' }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            onClick={() => handleRedirectClick('dashboard')}
            component="img"
            sx={{ cursor: "pointer", maxWidth: 100, ml:'21%' }}
            alt="Logo Inverbautista Shopping Center"
            src={LogoIsc}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer

          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

          }}
        >


          {drawer}

        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >

          {drawer}

        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {children}
      </Box>

    </Box>

  );
}


export default ResponsiveDrawer;