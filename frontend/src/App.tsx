import { Box } from "@mui/system";
import React, { Suspense, useEffect, useState } from "react";
import { Loader } from "./components/Loader/Loader.tsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { routes } from "./routes/routes";
import Layout from "./components/layout";
import { refreshUser } from "./axios/UserAPI";
import { useUserContext } from "./context/UserContext";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const userContext = useUserContext();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const user = await refreshUser();
      localStorage.setItem("accessToken", user.accessToken);
      userContext.setUser(user.user);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("accessToken");
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);


  if(loading) {
    return (
      <Box 
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}      
      >
          <Loader/>
      </Box>
    )
  }

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      }
    >
      <Layout>
        <Routes>
          {routes?.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
