import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
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
import CreateQuiz from "./components/Quiz/Create";
import EditQuiz from "./components/Quiz/Edit";
import Questions from "./components/Quiz/Questions";
import CreateQuestion from "./components/Quiz/Questions/Create";
import EditQuestion from "./components/Quiz/Questions/Edit";
import Submission from "./components/Submission";

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
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="bottom-center" />
      <Topbar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/public/:slug" component={Submission} />
        <PrivateRoute
          exact
          path="/quizzes/create"
          condition={isLoggedIn}
          component={CreateQuiz}
        />
        <PrivateRoute
          exact
          condition={isLoggedIn}
          path="/quizzes/:quiz_id/edit"
          component={EditQuiz}
        />
        <PrivateRoute
          exact
          condition={isLoggedIn}
          path="/quizzes/:quiz_id/questions/"
          component={Questions}
        />
        <PrivateRoute
          exact
          condition={isLoggedIn}
          path="/quizzes/:quiz_id/questions/create"
          component={CreateQuestion}
        />
        <PrivateRoute
          exact
          condition={isLoggedIn}
          path="/quizzes/:quiz_id/questions/:question_id/edit"
          component={EditQuestion}
        />
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
