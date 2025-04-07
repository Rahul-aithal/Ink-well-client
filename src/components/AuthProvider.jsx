import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children, authentication = true }) => {
  const [loader, setLoader] = useState(true);
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (authentication && authentication !== authstatus) {
      navigate("/sign-in");
    } else if (!authentication && authentication !== authstatus) {
      navigate("/");
    }
    setLoader(false);
  }, [navigate, authentication, authstatus]);

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
    authentication: PropTypes.bool,
  };

  return loader ? (
    <>
      <p>I am not able to verify</p>
    </>
  ) : (
    <>{children}</>
  );
};

export default AuthProvider;
