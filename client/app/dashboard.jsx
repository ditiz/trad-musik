import React, { Component } from "react";
import { Navigate } from "react-location";

export class Dashbord extends Component {
  render() {
    return (
      <div>
        <Navigate to="/List" />
      </div>
    );
  }
}
