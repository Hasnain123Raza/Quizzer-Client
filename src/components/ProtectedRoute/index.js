import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { sGetIsAuthenticated } from "../../services/authenticatedSlice/selectors.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ({ children, ...rest }) {
  const location = useLocation();
  const query = useQuery();
  query.set("redirect", location.pathname);

  const isAuthenticated = useSelector(sGetIsAuthenticated);

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect exact to={"/authentication/login?" + query.toString()} />
      )}
    </Route>
  );
}
