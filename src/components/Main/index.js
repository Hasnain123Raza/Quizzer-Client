import { Switch, Route } from "react-router-dom";
import Quiz from "../../areas/Quiz";

export default function () {
  return (
    <div className="main" style={{ backgroundColor: "white" }}>
      <Switch>
        <Route exact path="/">
          This is Home
        </Route>
        <Quiz />
        {/* <Route exact path="/browse">
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
        </Route> */}
        <Route exact path="*">
          Error 404
        </Route>
      </Switch>
    </div>
  );
}
