import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Auth from "../../components/Auth/Auth.tsx";
import { useNavigate } from "react-router-dom";
import parseApiError from "../../helper/parseAPIError";
import { toastError } from "../../toast/toast";
import { AxiosError } from "axios";
import { signIn } from "../../axios/UserAPI";
import { useUserContext } from "../../context/UserContext";

const Login: React.FC = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const userContext = useUserContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await signIn(data);
      localStorage.setItem("accessToken", user.accessToken);
      userContext.setUser(user.user);
      navigate("/");
    } catch (error) {
      if(error instanceof AxiosError) {
        const errors = parseApiError(error);
        errors.forEach(err => toastError(err));
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        width: "100%",
        height: "100vh",
        position: "absolute",
        zIndex: -99,
        overflowX: "hidden",
      }}
    >
      <Auth
        text="Login"
        firstname={false}
        lastname={false}
        email={true}
        password={true}
        handleSubmit={handleSubmit}
        data={data}
        setData={setData}
        isSubmitted={loading}
      />
    </Box>
  );
};

export default Login;
