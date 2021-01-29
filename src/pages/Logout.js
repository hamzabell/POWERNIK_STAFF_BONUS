import { useEffect } from "react";
import { WithSideNavigation } from "../components";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function Logout(props) {
  const history = useHistory();
  useEffect(() => {
    history.push("/");
    return () => {
      toast("👋 Logging you out");
      window.localStorage.clear();
    };
  });

  return null;
}

export default WithSideNavigation(Logout);
