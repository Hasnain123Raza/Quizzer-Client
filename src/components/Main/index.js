import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthenticated } from "../../services/authenticatedSlice";
import {
  sGetAuthenticatedRequestStatus,
  sGetHasAuthenticatedBefore,
} from "../../services/authenticatedSlice/selectors";

import PostRequestLoadingCard from "../PostRequestLoadingCard";

import Quiz from "../../areas/Quiz";
import Authentication from "../../areas/Authentication";

export default function () {
  const dispatch = useDispatch();

  const authenticatedRequestStatus = useSelector(
    sGetAuthenticatedRequestStatus
  );
  const hasAuthenticatedBefore = useSelector(sGetHasAuthenticatedBefore);

  if (!hasAuthenticatedBefore) {
    dispatch(getAuthenticated());
  }

  return (
    <div className="main" style={{ backgroundColor: "white" }}>
      {authenticatedRequestStatus == "fulfilled" ? (
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
      ) : (
        <PostRequestLoadingCard
          className="m-4"
          initiatePostRequest={() => dispatch(getAuthenticated())}
          postRequestStatus={authenticatedRequestStatus}
          pendingHeaderText="Please wait..."
          rejectedHeaderText="Uh oh..."
          pendingBodyText="We are loading some important resources."
          rejectedBodyText="We were unable to load some important resources."
        />
      )}
    </div>
  );
}
