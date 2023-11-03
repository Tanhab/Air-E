import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import themeConfig from "../../configs/themeConfig";

import NotificationDropdown from "../NotificationDropdown";
import UserDropdown from "../UserDropdown";

const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  marginRight: theme.spacing(8),
}));

export default function Navbar() {
  const theme = useTheme();

  return (
    <>
      <AppBar
        color="default"
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          ...( {
           
            padding:1
          }),
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            p: (theme) => `${theme.spacing(0, 6)} !important`,
            minHeight: `${
              theme.mixins.toolbar.minHeight - (0)
            }px !important`,
          }}
        >
          <LinkStyled to="/home">
          <img src={"/w.png"} height={50} width={50} alt="icon" />
            <Typography
              variant="h6"
              sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2, color: 'black' }}
            >
              {themeConfig.templateName}
            </Typography>
          </LinkStyled>

          <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
       <NotificationDropdown/>
       <UserDropdown/>
      </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
