import React from "react";
import { ListingTraduction } from "./listing/listingTraduction";
import { Dashbord } from "./dashboard";
import { DisplayTraduction } from "./listing/displayTraduction";
import { CreateTraduction } from "./creation/createTraduction";
import { AdminDashbord } from "./admin/dashbordAdmin";
import { Signup } from "./auth/signupPage";
import { Login } from "./auth/loginPage";
import { Logout } from "./auth/logoutPage";
import { VerifiedEmail } from "./auth/verifiedEmail";
import { PageNotFound } from "./pageNotFound";
import { SignupSuccessPage } from "./auth/signupSuccessPage";
import { ForgotPassword } from "./auth/forgotPassword";
import { ResetPassword } from "./auth/resetPassword";
import { Router, ReactLocation } from "react-location";
import { UserContext } from "./userContext";

const location = new ReactLocation();

export const Routing = ({ children, isAdmin, setAdmin }) => {
  const { user } = React.useContext(UserContext);

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

//         <Route exact path="/ForgotPassword" component={ForgotPassword} />
//         <Route exact path="/Reset-password/:token" component={ResetPassword} />

//         <Route component={PageNotFound} /> */}
//       </Switch>
//     );
//   }
// }

// Routing.contextType = UserContext;
