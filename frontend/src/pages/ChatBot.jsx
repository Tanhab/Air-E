import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import Lottie from "react-lottie";
import animationData from "../lotties/walle2.json";
import themeConfig from "../configs/themeConfig";

const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  marginRight: theme.spacing(8),
}));

const messages = [
  { id: 1, text: "Hi there!", sender: "bot" },
  { id: 2, text: "Hello!", sender: "user" },
  { id: 3, text: "How can I assist you today?", sender: "bot" },
];

const ChatUI = () => {
  const [input, setInput] = React.useState("");
  const theme = useTheme();
  theme.palette.primary.main = "#2596be";
  const handleSend = () => {
    if (input.trim() !== "") {
      console.log(input);
      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

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
      {/* <Lottie style={{flexDirection: "column"}} options={defaultOptions} height={300} width={350} /> */}

    
        <Box sx={{ height: "80vh", display: "flex", flexDirection: "column" }}>
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </Box>
          <Box sx={{ p: 2, backgroundColor: "background.default" }}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  placeholder="Type a message"
                  value={input}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={2} >
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSend}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
    </>
  );
};

const Message = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          backgroundColor: isBot ? "primary.light" : "secondary.light",
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatUI;
