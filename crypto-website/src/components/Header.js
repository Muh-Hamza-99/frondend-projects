import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const useStyles = makeStyles(() => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Poppins",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
            >
              BlockChainDept
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
