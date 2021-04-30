import { Switch, Route } from "react-router-dom";
import Browse from "../../scenes/Browse";
import Create from "../../scenes/Create";
import Open from "../../scenes/Open";
import Take from "../../scenes/Take";

export default function () {
  return (
    <div className="main" style={{ backgroundColor: "white" }}>
      <Switch>
        <Route exact path="/">
          This is Home
        </Route>
        <Route exact path="/browse">
          <Browse />
        </Route>
        <Route exact path="/create">
          <Create />
        </Route>
        <Route exact path="/open/:id">
          <Open />
        </Route>
        <Route exact path="/take/:id">
          <Take />
        </Route>
        <Route exact path="*">
          Error 404
        </Route>
      </Switch>
    </div>
  );
}
