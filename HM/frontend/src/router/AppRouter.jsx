import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../features/AuthSlice";
import HomeLayout from "../layout/HomeLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        let res = await axiosInstance.get("auth/current-user", {
          withCredentials: true,
        });
        if (res) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.log("error in current user api", error);
      }
    })();
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
        },
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <HomeLayout />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
