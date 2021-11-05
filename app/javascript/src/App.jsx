import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Toaster } from "react-hot-toast";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import { getFromLocalStorage } from "helpers/storage";

import PrivateRoute from "./components/Common/PrivateRoute";
import Topbar from "./components/Common/Topbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
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
      <Topbar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
