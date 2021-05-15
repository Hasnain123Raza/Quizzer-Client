import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { postLogoutRequest, reset } from "./services/accountSlice";
import { sGetPostLogoutRequestStatus } from "./services/accountSlice/selectors.js";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import PostRequestButton from "../../../../components/PostRequestButton";
import { sGetAuthenticatedUser } from "../../../../services/authenticatedSlice/selectors.js";

export default function () {
  const dispatch = useDispatch();

  const postLogoutRequestStatus = useSelector(sGetPostLogoutRequestStatus);
  const authenticatedUser = useSelector(sGetAuthenticatedUser);

  useEffect(() => {
    return function cleanup() {
      dispatch(reset());
    };
  });

  return (
    <div className="authentication-account">
      <Card className="m-4">
        <Card.Header>
          <h4>Account Management</h4>
        </Card.Header>
        <Card.Body>
          <b>UserID:</b> {authenticatedUser._id}
          <br />
          <b>Username:</b> {authenticatedUser.username}
        </Card.Body>
        <Card.Footer className="d-flex">
          {postLogoutRequestStatus === "fulfilled" ? (
            <Redirect exact to="/authentication/login" />
          ) : (
            <PostRequestButton
              className="ml-auto"
              initiatePostRequest={() => dispatch(postLogoutRequest())}
              postRequestStatus={postLogoutRequestStatus}
              idleText="Logout"
            />
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}
