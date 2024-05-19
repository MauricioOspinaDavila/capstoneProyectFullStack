import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Upload from "./Upload";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div>
        <Route path="/login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/upload">
          {token ? <Upload token={token} /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/">
          <Redirect to="/upload" />
        </Route>
      </div>
    </Router>
  );
};

export default App;
