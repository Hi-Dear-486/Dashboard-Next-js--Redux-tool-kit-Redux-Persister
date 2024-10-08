"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { MdExpandMore, MdDarkMode, MdLightMode, MdMenu } from "react-icons/md";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import RegistrationForm from "@/app/(views)/registrationform/page";
import ContactForm from "@/app/(views)/contactform/page";
import IELTSBooking from "@/app/(views)/(Exam Booking)/ielts/page";
import PTEBooking from "@/app/(views)/(Exam Booking)/pte/page";
const drawerWidth = 240;

const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState("DashBoard");
  const [examBookingMenuEl, setExamBookingMenuEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
    setIsMounted(true);
  }, []);

  const handleClick = (text) => {
    setSelectedItem(text);
  };

  const handleExamBookingClick = (event) => {
    setExamBookingMenuEl(event.currentTarget);
  };

  const handleMenuItemClick = (text) => {
    setExamBookingMenuEl(null);
    setSelectedItem(text);
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderContent = () => {
    const content = {
      DashBoard: "Main Content Area",
      Registration: <RegistrationForm darkMode={darkMode} />,
      Contact: <ContactForm darkMode={darkMode} />,
      ExamBooking: "Exam Booking content",
      "IELTS Booking": <IELTSBooking darkMode={darkMode} />,
      "PTE Booking": <PTEBooking darkMode={darkMode} />,
    };
    return <Typography variant="h6">{content[selectedItem]}</Typography>;
  };

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {["DashBoard", "Registration"].map((text) => (
          <ListItem
            button
            key={text}
            onClick={() => handleClick(text)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={handleExamBookingClick}
          sx={{ cursor: "pointer" }}
        >
          <ListItemText primary="Exam Booking" />
          <IconButton
            size="small"
            onClick={handleExamBookingClick}
            sx={{
              bgcolor: darkMode ? "#424242" : "white",
              color: darkMode ? "white" : "black",
            }}
          >
            <MdExpandMore />
          </IconButton>
        </ListItem>
        <Menu
          anchorEl={examBookingMenuEl}
          open={Boolean(examBookingMenuEl)}
          onClose={() => setExamBookingMenuEl(null)}
        >
          {["IELTS Booking", "PTE Booking"].map((subItem) => (
            <MenuItem
              key={subItem}
              onClick={() => {
                handleMenuItemClick(subItem);
              }}
              sx={{ cursor: "pointer" }}
            >
              {subItem}
            </MenuItem>
          ))}
        </Menu>
        <ListItem
          button
          onClick={() => handleClick("Contact")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: 1201, bgcolor: darkMode ? "#333" : "#1976d2" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: isMobile ? "block" : "none" }}
          >
            <MdMenu />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Image src={logo} alt="logo" width={50} height={50} />
            <Typography variant="h6" noWrap>
              Brand Name
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleToggleDarkMode} color="inherit">
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: darkMode ? "#424242" : "white",
            color: darkMode ? "white" : "black",
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: darkMode ? "background.default" : "white",
          color: darkMode ? "white" : "black",
          p: 3,
          margin: 2,
        }}
      >
        <Toolbar />
        {isMounted && (
          <Box
            sx={{
              bgcolor: darkMode ? "#424242" : "white",
              p: 2,
              borderRadius: 1,
            }}
          >
            {renderContent()}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
