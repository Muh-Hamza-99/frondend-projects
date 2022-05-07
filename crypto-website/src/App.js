import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import Header from "./components/Header";
import "./App.css";

import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161A",
      color: "white",
      minHeight: "100vh",
    }
  }));
  const classes = useStyles()
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
