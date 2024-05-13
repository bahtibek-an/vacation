import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import Manager from "../pages/ModifyVacation/ModifyVacation.tsx";
import Register from "../pages/Register/Login.tsx";
import Report from "../pages/Report/Report.tsx";


export const routes = [
  {
    path: "/",
    component: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>),
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/add-vacation",
    component: (
      <PrivateRoute isAdminPage={true}>
        <Manager />
      </PrivateRoute>),
  },
  {
    path: "/edit-vacation/:vacationId",
    component: (
      <PrivateRoute isAdminPage={true}>
        <Manager />
      </PrivateRoute>),
  },
  {
    path: "/report",
    component: (
        <PrivateRoute isAdminPage={true}>
          <Report />
        </PrivateRoute>),
  }
];
