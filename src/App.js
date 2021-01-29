import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage, Dashboard, ReportDetails, Report, Logout } from "./pages";
import { Global } from "./styled";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTokenContext, useGlobalContext } from "./context";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "react-dropdown/style.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";

function App() {
  const [token, setToken] = useTokenContext();
  const [state, dispatch] = useGlobalContext();

  useEffect(() => {
    if (state.staffs === null) {
      axios
        .get("/api/get-staffs")
        .then((res) => {
          return res.data;
        })
        .then((data) => dispatch({ type: "GET_STAFFS", payload: data.data }));
    }
  });

  useEffect(() => {
    const storedToken = window.localStorage.getItem("admin-token");
    if (storedToken) {
      setToken(`${storedToken}`);
    }
  });

  return (
    <>
      <Router>
        <Global />
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/report" component={Report} exact />
          <Route path="/report/:name" component={ReportDetails} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
