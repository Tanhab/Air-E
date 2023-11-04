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
import themeConfig from "../configs/themeConfig";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import { getDataByName } from "../api/searchApi";
const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  marginRight: theme.spacing(8),
}));

function createData(name, col1, col2) {
  return { name, col1, col2 };
}

const indicators = [
  {
    indicator: "aqi",
    name: "AQI",
    position: 0,
  },

  {
    indicator: "co",
    name: "CO",
    position: 1,
  },

  {
    indicator: "o3",
    name: "O3",
    position: 2,
  },

  {
    indicator: "no",
    name: "NO",
    position: 3,
  },

  {
    indicator: "no2",
    name: "NO2",
    position: 4,
  },

  {
    indicator: "so2",
    name: "SO2",
    position: 5,
  },
  {
    indicator: "pm2_5",
    name: "PM 2.5",
    position: 6,
  },
  {
    indicator: "pm10",
    name: "PM 10",
    position: 7,
  },
];

const defaultRows = indicators.map((e) => [e.name, null, null]);

export default function Compare() {
  const theme = useTheme();
  theme.palette.primary.main = "#2596be";
  const [suggestion, setSuggestion] = useState([]);
  const [rows, setRows] = useState(defaultRows);

  const handleOnSearch = async (string, results) => {
    const response = await axios.get(
      "http://localhost:3000/v1/search/autoComplete?keyword=" + string
    );
    console.log(response.data);
    setSuggestion(response.data);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item, index) => {
    const name = item.name;
    getDataByName(name).then((e) => {
      console.log(e);
      let data = [...rows];
      for (let x of indicators) {
        let position = x.position;
        data[position][index + 1] = e.air[x.indicator];
      }
      console.log(data);
      setRows(data);
    });
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  // Step 1: Define a state variable for column count
  const [columnCount, setColumnCount] = useState(3); // Initial column count is 2

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
        {/* <button style={{float:"right",marginTop:10, fontWeight:700}} onClick={addColumn}>Add Another Location</button>
        Step 3: Render the additional columns based on columnCount */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "200px" }}>
                  Location Comparison
                </TableCell>
                {Array.from({ length: columnCount - 1 }).map((_, index) => (
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
                      onSelect={(item) => handleOnSelect(item, index)}
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
                  {Array.from({ length: columnCount }).map((_, index) => (
                    <TableCell key={index}>{row[index]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
