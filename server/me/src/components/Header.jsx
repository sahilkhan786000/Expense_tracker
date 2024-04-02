import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import A from '../pictures/A.png'






function Header(props) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      const username = extractUsername(email); // Extract username
      setUsername(username);
    }
  }, []);

const drawerWidth = 240;
const navItems = ['Home', 'About' ];
const navItems1 = ['Home', 'About', 'Login', 'Signup' ];
const navItems2 = [`Hi + ${username}`, 'Home', 'About', 'LogOut'];  

  
function extractUsername(email) {
  // Improved username extraction logic (handles more cases)
  const parts = email.split('@');
  if (parts.length > 1) {
    return parts[0]; // Username is typically before "@"
  }
  return ''; // Return empty string if email is invalid or missing "@"
}

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogOut = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('authToken');
    navigate('/');
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ display : 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <Box sx={{ my: 2 }}>
      <img 
            src={A}
            alt="logo"
            height="120px"
            width="120px"
            
          />
      </Box>
      <Divider />
     
      <List>
       
     {!localStorage.getItem("authToken") ?
    navItems1.map((item) => (
      <ListItem key={item} disablePadding onClick={() => {
          if (item === "Login") {
            navigate("/login");
          }else if(item === "Signup") {
            navigate("/signup");}
          else if(item === "Home") {
            navigate("/");
          }
           } }>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary={item} />
        </ListItemButton>
      </ListItem>
    ))
    :
    navItems2.map((item) => (
      <ListItem key={item} disablePadding onClick = {() => { if (item === "Home") {navigate("/")} 
      else if (item === "LogOut") {handleLogOut()}  }}>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary={item} />
        </ListItemButton>
      </ListItem>
    ))
  }
        

      </List>

     

      
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: 'turquoise' }}>
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
          <Box sx = {{display : { xs: 'none', sm: 'block'}}}>
           <img 
            src={A}
            alt="logo"
            height="120px"
            width="120px"
            
          /></Box>
          

         
  
          <Box sx={{ ml: '20px', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
  
          {!localStorage.getItem("authToken") ?
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Button sx={{ color: '#fff' }} onClick={() => navigate("/login")}>Login</Button>
              <Button sx={{ color: '#fff' }} onClick={() => navigate("/signup")}>SignUp</Button>
            </Box>
            :
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Button sx={{ color: '#fff' }} onClick={() => handleLogOut()}>LogOut</Button>
              <Box sx={{ color: '#fff' }}>Hi {username}</Box>
            </Box>
          }
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
        }  

// DrawerAppBar.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default Header;