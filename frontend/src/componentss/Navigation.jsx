import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { logo } from '../assets'

const pages = [
  { name: 'Introduction', id: 'introduction' },
  { name: 'Activities', id: 'activities' },
  { name: 'Booking', id: 'booking' },
  { name: 'Join', id: 'join'},
  { name: 'Contact', id: 'footer' },
];

const settings = [{
  key: 'profile',
  name: 'Profile',
  path: '/user',
},{
  key: 'logout',
  name: 'Logout',
  path: '/login',
}]

const handleLogout = () => {
  localStorage.removeItem("utmId");
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const location = useLocation();

  return (
    <AppBar position="static" color='transparent' sx={{ backdropFilter: 'saturate(180%) blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.7)', boxShadow: '0px 3px 5px 2px rgba(0, 0, 0, 0.3)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton sx={{display: {xs: 'none', md: 'flex'}}}>
            <Link to="/">
              <img src={logo} alt="logo" width="50px"/>
            </Link>
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <a 
                  key={page.id} 
                  href={`#${page.id}`}
                  onClick={handleCloseNavMenu}
                >
                  <Typography sx={{ px: 2, py: 1}} textAlign="center">{page.name}</Typography>
                </a>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
            {pages.map((page) => (
              <React.Fragment key={page.id}>
                {page.name === 'Booking' ? (
                  <Link
                    to="/booking"
                    style={{
                      margin: '0 10px',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: '0.3s',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'lightblue';
                      e.target.style.boxShadow = '0 0 10px #f0f0f0';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {page.name}
                  </Link>
                ) : (
                  <a
                    href={location.pathname === '/booking' ? `/#${page.id}` : `/#${page.id}`}
                    style={{
                      margin: '0 10px',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: '0.3s',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'lightblue';
                      e.target.style.boxShadow = '0 0 10px #f0f0f0';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {page.name}
                  </a>
                )}
              </React.Fragment>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.key} onClick={setting.key === "logout" ? handleLogout : undefined}>
                  <Link to={setting.path} textAlign="center" >{setting.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;