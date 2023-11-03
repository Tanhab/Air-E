import React, { Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PerfectScrollbar from "react-perfect-scrollbar";
import Typography from "@mui/material/Typography";
import { Button, Box, Chip } from "@mui/material";
import { styled } from '@mui/material/styles'




// Sample notifications data
const notifications = [
  {
    meta: "Today",
    avatarAlt: "Flora",
    title: "Congratulations Flora! 🎉",
    avatarImg: "1.png",
    subtitle: "Won the monthly best seller badge",
  },
  {
    meta: "19 Mar",
    avatarAlt: "order",
    title: "Received Order 📦",
    avatarImg: "1.png",
    subtitle: "New order received from John",
  },
];

const getInitials = (string) =>
  string
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "");


    const MenuItemTitle = styled(Typography)(({ theme }) => ({
        fontWeight: 600,
        flex: '1 1 100%',
        overflow: 'hidden',
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginBottom: theme.spacing(0.75)
      }))
      
      // ** Styled component for the subtitle in MenuItems
      const MenuItemSubtitle = styled(Typography)({
        flex: '1 1 100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      })

export default function NotificationDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const RenderAvatar = ({ notification }) => {
    const { avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor } =
      notification;
    if (avatarImg) {
      return <Avatar alt={avatarAlt} src={avatarImg} />;
    } else if (avatarIcon) {
      return (
        <Avatar skin="light" color={avatarColor}>
          {avatarIcon}
        </Avatar>
      );
    } else {
      return (
        <Avatar skin="light" color={avatarColor}>
          {getInitials(avatarText)}
        </Avatar>
      );
    }
  };

  return (
    <Fragment>
      <IconButton color="inherit" onClick={handleDropdownOpen}>
        <Badge color="error" variant="dot" invisible={!notifications.length}>
          <NotificationsIcon  size="large"/>
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
      >
        <MenuItem disableRipple disableTouchRipple>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ cursor: "text", fontWeight: 600 }}>
              Notifications
            </Typography>
            <Chip label={`${notifications.length} New`} color="primary" size="small"  sx={{  bgcolor: "#976BCF" }}/>
          </Box>
        </MenuItem>
        <PerfectScrollbar
          options={{ wheelPropagation: false, suppressScrollX: true }}
        >
          {notifications.map((notification, index) => (
            <MenuItem key={index} onClick={handleDropdownClose}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <RenderAvatar notification={notification} />
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{notification.title}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>{notification.subtitle}</MenuItemSubtitle>
                </Box>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {notification.meta}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </PerfectScrollbar>
        <MenuItem
          disableRipple
          disableTouchRipple
          style={{
            py: 3.5,
            borderBottom: 0,
            cursor: "default",
            userSelect: "auto",
            backgroundColor: "transparent !important",
            borderTop: "1px solid divider",
          }}
        >
          <Button fullWidth variant="contained" onClick={handleDropdownClose}  sx={{  bgcolor: "#976BCF" }}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
