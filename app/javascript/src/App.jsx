import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { either, isEmpty, isNil } from "ramda";
import { Toaster } from "react-hot-toast";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import PrivateRoute from "common/PrivateRoute";
import Topbar from "common/Topbar";
import Dashboard from "components/Dashboard";
import ErrorBoundary from "components/ErrorBoundary";
import Fallback from "components/Fallback";
import Login from "components/Login";
import Participant from "components/Participant";
import Attempt from "components/Participant/Attempt";
import ParticipantLogin from "components/Participant/Login";
import Result from "components/Participant/Result";
import CreateQuiz from "components/Quiz/Create";
import EditQuiz from "components/Quiz/Edit";
import ShowQuiz from "components/Quiz/Questions";
import CreateQuestion from "components/Quiz/Questions/Create";
import EditQuestion from "components/Quiz/Questions/Edit";
import Report from "components/Report";
import { getFromLocalStorage } from "helpers/storage";

import { initializeLogger } from "./common/logger";
import { ParticipantContext } from "./contexts/ParticipantContext";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [participantData, setParticipantData] = useState();
  const [slugVerified, setSlugVerified] = useState(false);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
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
    <ErrorBoundary>
      <Router>
        <Toaster position="bottom-center" />
        <Topbar isLoggedIn={isLoggedIn} />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path={"/public"}>
            <ParticipantContext.Provider
              value={{
                participantData,
                setParticipantData,
                slugVerified,
                setSlugVerified,
              }}
            >
              <Route exact path="/public/:slug" component={Participant} />
              <Route
                exact
                path="/public/:slug/attempt/new"
                component={ParticipantLogin}
              />
              <Route
                exact
                path="/public/:slug/attempt/quiz-new"
                component={Attempt}
              />
              <Route
                exact
                path="/public/:slug/attempt/quiz-result"
                component={Result}
              />
            </ParticipantContext.Provider>
          </Route>
          <PrivateRoute
            exact
            path="/quizzes/new"
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
            path="/quizzes/:quiz_id/show"
            component={ShowQuiz}
          />
          <PrivateRoute
            exact
            condition={isLoggedIn}
            path="/reports"
            component={Report}
          />
          <PrivateRoute
            exact
            condition={isLoggedIn}
            path="/questions/new"
            component={CreateQuestion}
          />
          <PrivateRoute
            exact
            condition={isLoggedIn}
            path="/questions/:question_id/edit"
            component={EditQuestion}
          />
          <PrivateRoute
            exact
            path="/"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={Dashboard}
          />
          <Route component={Fallback} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
