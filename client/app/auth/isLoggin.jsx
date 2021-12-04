import React, { useEffect } from "react";
import { useNavigate } from "react-location";

export const IsLoggin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Meteor.userId()) {
      navigate({ to: "./Login", replace: true });
      Bert.alert("Vous n'êtes pas connecté", "danger", "growl-top-right");
    } else {
      Meteor.call("user.isUser", Meteor.userId(), (err, res) => {
        if (!res) {
          Bert.alert("Vous n'êtes pas connecté", "danger", "growl-top-right");
          navigate({ to: "./Login", replace: true });
        }
      });
    }
  }, [navigate]);

  return <> </>;
};
