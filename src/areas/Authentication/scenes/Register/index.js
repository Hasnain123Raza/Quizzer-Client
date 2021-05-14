import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import PostRequestButton from "../../../../components/PostRequestButton";
import {
  reset,
  postRegisterForm,
  setUsername,
  setPassword,
} from "./services/registerSlice";
import {
  sGetUser,
  sGetUsername,
  sGetPassword,
  sGetPostRegisterRequestStatus,
  sGetUsernameError,
  sGetPasswordError,
} from "./services/registerSlice/selectors.js";

export default function () {
  const dispatch = useDispatch();

  const user = useSelector(sGetUser);
  const username = useSelector(sGetUsername);
  const password = useSelector(sGetPassword);
  const postRegisterRequestStatus = useSelector(sGetPostRegisterRequestStatus);

  const usernameError = useSelector(sGetUsernameError);
  const passwordError = useSelector(sGetPasswordError);

  useEffect(() => {
    return function cleanup() {
      dispatch(reset());
    };
  }, []);

  return (
    <div className="authentication-register">
      <Card className="m-4">
        <Card.Header>
          <h4>Account Registration</h4>
        </Card.Header>

        <Card.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoComplete="off"
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
                autoComplete="off"
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
          {postRegisterRequestStatus === "fulfilled" ? (
            <Redirect to="/authentication/login" />
          ) : (
            <PostRequestButton
              className="ml-auto"
              initiatePostRequest={() => dispatch(postRegisterForm(user))}
              postRequestStatus={postRegisterRequestStatus}
              idleText="Submit"
            />
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}
