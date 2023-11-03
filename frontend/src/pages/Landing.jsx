import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Container, Grid, Typography, Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Lottie from "react-lottie";
import animationData from "../lotties/walle.json";

import themeConfig from "../configs/themeConfig";

const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  marginRight: theme.spacing(8),
}));

export default function Landing() {
  const theme = useTheme();
  theme.palette.primary.main = "#2596be";
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        color="default"
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          ...{
            padding: 1,
          },
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            p: (theme) => `${theme.spacing(0, 6)} !important`,
            minHeight: `${theme.mixins.toolbar.minHeight - 0}px !important`,
          }}
        >
          <LinkStyled to="/home">
            <img src={"/w.png"} height={50} width={50} alt="icon" />
            <Typography
              variant="h6"
              sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2, color: "black" }}
            >
              {themeConfig.templateName}
            </Typography>
          </LinkStyled>
        </Toolbar>
      </AppBar>

      <Container>
  <Lottie options={defaultOptions} height={500} width={500} />
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Center elements vertically
      justifyContent: "center", // Center elements horizontally
      textAlign: "center", // Center text horizontally
      marginTop: "3rem", // Adjust the top margin as needed
    }}
  >
    <Typography variant="h2" sx={{ fontWeight: 700, color: "primary.main" }}>
      Breath Clean, Live Green
    </Typography>

    <Typography variant="h5" sx={{ color: "black" }}>
    Welcome to our platform, where data meets the environment. Explore the world's air quality and its connection to socio-economic factors with our innovative application.
    </Typography>

    <Button
      size="large"
      type="submit"
      variant="contained"
      sx={{ mt: 2, bgcolor: "primary.main", fontWeight: 700 }}
      onClick={() => {
        navigate("/home");
      }}
    >
      Explore
    </Button>
  </div>
</Container>

    </>
  );
}
