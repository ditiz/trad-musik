import React, { Component } from "react";
import { Link, Navigate } from "react-location";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      info: "",
      isAdmin: this.props.isAdmin,
      redirect: false,
    };
  }

  componentDidMount() {
    let self = this;
    if (Meteor.userId()) {
      Meteor.call("user.isUser", Meteor.userId(), (err, res) => {
        if (res) {
          self.setState({
            info: "Vous êtes déjà connecté",
          });
        }
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    Meteor.loginWithPassword(email, password, (err, res) => {
      if (err) {
        if (err.reason == "emailNotVerify") {
          let message =
            "Vous devez vérifier votre email avant de vous connecter";
          Bert.alert(message, "danger", "growl-top-right");
          this.setState({
            redirect: "/Signup-success/" + err.details,
          });
        } else {
          Bert.alert(err.reason, "danger", "growl-top-right");
        }
      } else {
        Meteor.call("user.isAdmin", Meteor.userId(), (err, res) => {
          if (res) {
            Bert.alert(
              "Vous êtes connecter en tant qu'admin",
              "success",
              "growl-top-right"
            );
            this.setState({ redirect: "/List" });
            this.props.setAdmin(true);
          } else {
            Bert.alert("Vous êtes connecter", "success", "growl-top-right");
            this.setState({ redirect: "/List" });
            this.props.setAdmin(false);
          }
        });
      }
    });
  };

  render() {
    const error = this.state.error;
    const info = this.state.info;

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    return (
      <div className="container-fluid col-12">
        <div className="col-3 container">
          <div className="card card-header col-12 bg-dark text-white">
            <h2>Connexion</h2>
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
                    type="text"
                    id="login-email"
                    className="form-control input-lg"
                    placeholder="Adresse mail"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="login-password"
                    className="form-control input-lg"
                    placeholder="Mot de passe"
                  />
                </div>
                <div className="form-group text-center">
                  <input
                    type="submit"
                    id="login-button"
                    className="btn btn-primary btn-lg btn-block"
                    value="Connexion"
                  />
                </div>

                {error.length > 0 ? (
                  <div className="alert alert-danger">{error}</div>
                ) : (
                  ""
                )}

                {info.length > 0 ? (
                  <div className="alert alert-info">{info}</div>
                ) : (
                  ""
                )}

                <div className="form-group text-center">
                  <p className="text-center">
                    Pas encore de compte ?
                    <div>
                      <Link to="/Signup">Inscription ici</Link>
                    </div>
                    <div>
                      <Link to="/ForgotPassword">Mot de passe oublié ?</Link>
                    </div>
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
