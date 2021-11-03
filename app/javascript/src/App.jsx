import React, { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";

import Topbar from "./components/Common/Topbar";
import Login from "./components/Login";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerIntercepts();
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Toaster position="bottom-center" />
      <Topbar />
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
