import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Container, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import themeConfig from "../src/configs/themeConfig";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  marginRight: theme.spacing(8),
}));

function createData(name, col1, col2) {
  return { name, col1, col2 };
}

const rows = [
  createData("AQI", 159, 6.0),
  createData("PM2.5 levels", 237, 9.0),
  createData("PM10 levels", 262, 16.0),
  createData("Ozone levels", 305, 3.7),
];

const suggestion = [
  // ... (suggestion data)
];

export default function Compare() {
  const theme = useTheme();
  theme.palette.primary.main = "#87CEEB";

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  // Step 1: Define a state variable for column count
  const [columnCount, setColumnCount] = useState(2); // Initial column count is 2

  // Step 2: Function to increment column count
  const addColumn = () => {
    setColumnCount(columnCount + 1);
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
        </Toolbar>
      </AppBar>

      <Container>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            textAlign: "center",
            mb: 5,
          }}
        >
          Compare on Air Quality
        </Typography>

        {/* Step 3: Render the additional columns based on columnCount */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "200px" }}>Location Comparison</TableCell>
                {Array.from({ length: columnCount }).map((_, index) => (
                  <TableCell key={index} align="right">
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
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  {Array.from({ length: columnCount }).map((_, index) => (
                    <TableCell key={index}>{/* Add cell data here */}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Step 4: Button to add a column */}
        <button onClick={addColumn}>Add Column</button>
      </Container>
    </>
  );
}
