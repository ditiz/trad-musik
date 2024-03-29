import React, { Component } from "react";
import { Link, Navigate } from "react-location";

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      redirect: false,
      userId: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let email = document.getElementById("login-email").value;
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let newUser = {
      mail: email,
      username: username,
      password: password,
    };

    Meteor.call("user.insertNew", newUser, (err, res) => {
      if (err) {
        this.setState({
          error: err.reason,
        });
      } else {
        this.setState({
          error: "",
          redirect: true,
          userId: res,
        });
      }
    });
  };

  render() {
    const error = this.state.error;

    if (this.state.redirect) {
      return <Navigate to={"Signup-success/" + this.state.userId} />;
    }

    return (
      <div className="container-fluid col-12">
        <br />
        <div className="col-3 container">
          <div className="card card-header col-12 bg-dark text-white">
            <h2>Inscription</h2>
          </div>

          <div className="card card-body">
            <form
              id="login-form"
              className="form center-block"
              onSubmit={this.handleSubmit}
            >
              <div>
                <div className="form-group">
                  <input
                    type="email"
                    id="login-email"
                    className="form-control input-lg"
                    placeholder="Adresse mail"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="login-username"
                    className="form-control input-lg"
                    placeholder="Nom d'utilisateur"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    id="login-password"
                    className="form-control input-lg"
                    placeholder="Mot de passe"
                    required
                  />
                </div>

                <div className="form-group text-center">
                  <input
                    type="submit"
                    id="login-button"
                    className="btn btn-primary btn-lg btn-block"
                    value="Login"
                  />
                </div>

                {error.length > 0 ? (
                  <div className="alert alert-danger">{error}</div>
                ) : (
                  ""
                )}

                <div className="form-group text-center">
                  <p className="text-center">
                    Déjà un compte?
                    <br />
                    <Link to="/signup">Accéder à la connexion</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
