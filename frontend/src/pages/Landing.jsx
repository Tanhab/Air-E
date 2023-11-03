import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Container, Grid, Typography, Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Lottie from "react-lottie";
import animationData from "../lotties/earth.json";

import themeConfig from "../configs/themeConfig";

const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  marginRight: theme.spacing(8),
}));

export default function Landing() {
  const theme = useTheme();
  theme.palette.primary.main = "#976BCF";
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
        <Button
          size="large"
          type="submit"
          variant="contained"
          sx={{ mt: 7, bgcolor: "#976BCF", fontWeight: 700 }}
          onClick={() => {
            navigate("/home");
          }}
        >
          Explore
        </Button>
        {/* <Grid container spacing={5} sx={{ mt: 4 }} justifyContent="center">
          <Grid item xs={6}>
            <Typography
              variant="h1"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              Hello Earthlings!
            </Typography>
            <Typography variant="h5" sx={{}}>
              Your Adventure awaits. Join our world and experience all the
              wonders that will make your life easy.
            </Typography>
            <Button
             
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 7, bgcolor: "#976BCF", fontWeight:700 }}
              onClick={()=> {
                navigate("/signup")
              }}
            >
              Join Now
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Lottie options={defaultOptions} height={400} width={400} />
          </Grid>
        </Grid> */}
      </Container>
    </>
  );
}
