import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../hooks/useAuth"; // Custom hook to handle authentication
import { useRole } from "../hooks/useRole"; // Custom hook to handle roles

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Assuming useAuth hook provides user info and logout function
  const { role } = useRole(); // Assuming useRole hook provides user role

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Book Rental App
        </Typography>
        {user ? (
          <>
            {role === "admin" && (
              <Button
                color="inherit"
                onClick={() => handleNavigation("/admin-dashboard")}
              >
                Admin Dashboard
              </Button>
            )}
            {role === "owner" && (
              <Button
                color="inherit"
                onClick={() => handleNavigation("/owner-dashboard")}
              >
                Owner Dashboard
              </Button>
            )}
            {role === "customer" && (
              <Button
                color="inherit"
                onClick={() => handleNavigation("/customer-dashboard")}
              >
                Customer Dashboard
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => handleNavigation("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleNavigation("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        {user && (
          <>
            {role === "admin" && (
              <MenuItem onClick={() => handleNavigation("/admin-dashboard")}>
                Admin Dashboard
              </MenuItem>
            )}
            {role === "owner" && (
              <MenuItem onClick={() => handleNavigation("/owner-dashboard")}>
                Owner Dashboard
              </MenuItem>
            )}
            {role === "customer" && (
              <MenuItem onClick={() => handleNavigation("/customer-dashboard")}>
                Customer Dashboard
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        )}
        {!user && (
          <>
            <MenuItem onClick={() => handleNavigation("/login")}>
              Login
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/signup")}>
              Signup
            </MenuItem>
          </>
        )}
      </Menu>
    </AppBar>
  );
};

export default Header;
