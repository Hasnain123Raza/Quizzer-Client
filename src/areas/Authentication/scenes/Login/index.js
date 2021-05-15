import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { Redirect, useLocation } from "react-router-dom";
import PostRequestButton from "../../../../components/PostRequestButton";
import {
  reset,
  postLoginForm,
  setUsername,
  setPassword,
} from "./services/loginSlice";
import {
  sGetUser,
  sGetUsername,
  sGetPassword,
  sGetPostLoginRequestStatus,
  sGetUsernameError,
  sGetPasswordError,
} from "./services/loginSlice/selectors.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function () {
  const dispatch = useDispatch();
  const query = useQuery();
  const redirectPath = query.get("redirect");

  const user = useSelector(sGetUser);
  const username = useSelector(sGetUsername);
  const password = useSelector(sGetPassword);
  const postLoginRequestStatus = useSelector(sGetPostLoginRequestStatus);

  const usernameError = useSelector(sGetUsernameError);
  const passwordError = useSelector(sGetPasswordError);

  useEffect(() => {
    return function cleanup() {
      dispatch(reset());
    };
  }, []);

  return (
    <div className="authentication-login">
      <Card className="m-4">
        <Card.Header>
          <h4>Account Login</h4>
        </Card.Header>

        <Card.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoComplete="on"
                type="text"
                placeholder="Username"
                value={username}
                isInvalid={usernameError !== undefined}
                onChange={(event) => dispatch(setUsername(event.target.value))}
              />
              <Form.Control.Feedback type="invalid">
                {usernameError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoComplete="on"
                type="password"
                placeholder="Password"
                value={password}
                isInvalid={passwordError !== undefined}
                onChange={(event) => dispatch(setPassword(event.target.value))}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Card.Body>

        <Card.Footer className="d-flex">
          {postLoginRequestStatus === "fulfilled" ? (
            <Redirect
              to={
                Boolean(redirectPath) ? redirectPath : "/authentication/account"
              }
            />
          ) : (
            <PostRequestButton
              className="ml-auto"
              initiatePostRequest={() => dispatch(postLoginForm(user))}
              postRequestStatus={postLoginRequestStatus}
              idleText="Login"
            />
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}
