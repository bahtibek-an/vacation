import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Auth from "../../components/Auth/Auth.tsx";
import { signUp } from "../../axios/UserAPI";
import parseApiError from "../../helper/parseAPIError";
import { AxiosError } from "axios";
import { toastError } from "../../toast/toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Register: React.FC = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userContext = useUserContext();

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
      const user = await signUp(data);
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
        text="Register"
        firstname={true}
        lastname={true}
        email={true}
        password={true}
        data={data}
        setData={setData}
        handleSubmit={handleSubmit}
        isSubmitted={loading}
      />
    </Box>
  );
};

export default Register;
