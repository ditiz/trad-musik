import React, { Component } from "react";
import { Navigate } from "react-location";

export class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  componentWillMount() {
    let self = this;
    let user_id = Meteor.userId();

    Meteor.logout((err) => {
      if (!err) {
        if (user_id) {
          Bert.alert("Déconnexion", "success", "growl-top-right");
        }
        self.setState({
          redirect: true,
        });
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/Login" />;
    }
    return <></>;
  }
}
