import { Switch, Route } from "react-router-dom";

import Quiz from "../../areas/Quiz";
import Authentication from "../../areas/Authentication";

export default function () {
  return (
    <div className="main" style={{ backgroundColor: "white" }}>
      <Switch>
        <Route exact path="/">
          This is Home
        </Route>

        {Quiz()}
        {Authentication()}

        <Route exact path="*">
          Error 404
        </Route>
      </Switch>
    </div>
  );
}
