import { Route } from "react-router-dom";
import React from "react";

import Browse from "./scenes/Browse";
import Create from "./scenes/Create";
import Open from "./scenes/Open";
import Take from "./scenes/Take";

export default function () {
  return (
    <React.Fragment>
      <Route exact path="/quiz/browse">
        <Browse />
      </Route>
      <Route exact path="/quiz/create">
        <Create />
      </Route>
      <Route exact path="/quiz/open/:id">
        <Open />
      </Route>
      <Route exact path="/quiz/take/:id">
        <Take />
      </Route>
    </React.Fragment>
  );
}
