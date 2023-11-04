import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled, useTheme, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import themeConfig from "../../configs/themeConfig";
import InputBase from "@mui/material/InputBase";
import NotificationDropdown from "../NotificationDropdown";
import UserDropdown from "../UserDropdown";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRecoilState } from "recoil";
import cityAtom from "../../atoms/cityAtom";
import axios from "axios";
const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  marginRight: theme.spacing(8),
}));

export default function Navbar() {
  const theme = useTheme();
  const [city, setCity] = useRecoilState(cityAtom);
  const [suggestion, setSuggestion] = useState([]);

  const handleOnSearch = async (string, results) => {
    const response = await axios.get(
      "http://localhost:3000/v1/search/autoComplete?keyword=" + string
    );
    console.log(response.data);
    setSuggestion(response.data);
  };

  const handleOnHover = (result) => {};

  const handleOnSelect = (item) => {
    console.log("handleOnSelect");
    console.log(item);
    setCity(item.name);
    console.log(city);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

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
          <div style={{ width: 400 }}>
            <ReactSearchAutocomplete
              styling={{
                width: "100",
                zIndex: 4,
                color: "black",
              }}
              items={suggestion}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              onClear={handleOnClear}
              autoFocus
            />
          </div>

          <Box
            className="actions-right"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* <NotificationDropdown /> */}
            <UserDropdown />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
