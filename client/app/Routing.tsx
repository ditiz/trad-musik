import React from "react";
import { ReactLocation, Router } from "react-location";
import { AdminDashbord } from "./admin/dashbordAdmin";
import { ForgotPassword } from "./auth/forgotPassword";
import { Login } from "./auth/loginPage";
import { Logout } from "./auth/logoutPage";
import { ResetPassword } from "./auth/resetPassword";
import { Signup } from "./auth/signupPage";
import { SignupSuccessPage } from "./auth/signupSuccessPage";
import { VerifiedEmail } from "./auth/verifiedEmail";
import { CreateTraduction } from "./creation/createTraduction";
import { Dashbord } from "./dashboard";
import { DisplayTraduction } from "./listing/displayTraduction";
import { ListingTraduction } from "./listing/listingTraduction";

const location = new ReactLocation();

interface RoutingProps {
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
  children: React.ReactNode;
}

export const Routing = ({ children, isAdmin, setAdmin }: RoutingProps) => {
  const routes = [
    { path: "/", element: <ListingTraduction /> },
    {
      path: "List",
      element: <ListingTraduction />,
      children: [
        { path: "User/:user", element: <ListingTraduction /> },
        { path: "Artist/:artist", element: <ListingTraduction /> },
      ],
    },
    { path: "Create", element: <CreateTraduction /> },
    { path: "Dashboard", element: <Dashbord /> },
    { path: "Show/:traduction", element: <DisplayTraduction /> },
    { path: "Edit/:traduction", element: <CreateTraduction /> },
    { path: "Admin", element: <AdminDashbord /> },
    { path: "Signup", element: <Signup /> },
    { path: "Login", element: <Login isAdmin={isAdmin} setAdmin={setAdmin} /> },
    { path: "Logout", element: <Logout /> },
    { path: "verify-email", element: <VerifiedEmail /> },
    { path: "Signup-success/:userId", element: <SignupSuccessPage /> },
    { path: "ForgotPassword", element: <ForgotPassword /> },
    { path: "Reset-password/:token", element: <ResetPassword /> },
  ];

  return (
    <Router location={location} routes={routes}>
      {children}
    </Router>
  );
};
