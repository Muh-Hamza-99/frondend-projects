import TextEditor from "./TextEditor";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact>
          <Navigate to={`/documents/${uuidV4()}`} />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;