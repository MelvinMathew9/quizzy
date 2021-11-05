import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";

import Quiz from "./Quiz";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-start justify-start flex-grow h-screen overflow-y-auto">
      <Switch>
        <Route exact path="/quizzes" component={Quiz} />
        <Redirect from="/" to="/quizzes" />
      </Switch>
    </div>
  );
};

export default Dashboard;
