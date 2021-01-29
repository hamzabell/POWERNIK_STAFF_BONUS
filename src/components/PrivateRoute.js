import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function PrivateRoute({ children }) {
  const token = window.localStorage.getItem("admin-token");
  const StringToken = `${token}`;
  const history = useHistory();

  const getTokenState = async () => {
    const state = await axios
      .get("/api/verify-token", {
        params: {
          token: StringToken,
        },
      })
      .then((res) => res.data);

    return state.isAuthenticated;
  };

  if (token === null || StringToken === "") {
    history.push("/");
    return null;
  }

  if (!getTokenState()) {
    history.push("/");
    return null;
  }

  return <>{children}</>;
}

export default PrivateRoute;
