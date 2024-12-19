import React, { useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import Courses from '../Courses/Courses';
import { useUser } from '../context';

const drawerWidth = 240;

const Dashboard = () => {
  const { user } = useUser();
  console.log("user")
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Courses'); // Track selected item

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (item) => {
    setSelectedItem(item);
  };

  // Sidebar content
  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {['Courses', 'Assignments', 'Settings', 'Profile', 'Logout'].map((text) => (
          <ListItem 
            button 
            key={text}
            onClick={() => handleListItemClick(text)}
            selected={selectedItem === text} // Highlight selected item
            sx={{
                cursor:'pointer',
              backgroundColor: selectedItem === text ? '#afdedc' : 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Function to render content based on selected sidebar item
  const renderContent = () => {
    switch (selectedItem) {
      case 'Courses':
        return <Courses />;
      case 'Assignments':
        return <Typography paragraph>This is the Assignments content.</Typography>;
      case 'Settings':
        return <Typography paragraph>This is the Settings content.</Typography>;
      case 'Profile':
        return <Typography paragraph>This is the Profile content.</Typography>;
      case 'Logout':
        return <Typography paragraph>Logging out...</Typography>;
      default:
        return <Typography paragraph>Welcome to the Dashboard!</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#ffffff', color: '#000000' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box component="img" src="images/mainlogo.png" alt="Logo" sx={{ width: 100, height: 40, mr: 2 }} />

          <Typography sx={{ml:'auto'}}>{user.email}</Typography>

          <IconButton sx={{ml:'auto'}} color="inherit" aria-label="logout" onClick={() => alert("Logout clicked!")}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar for Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>

      {/* Sidebar for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none', },
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
