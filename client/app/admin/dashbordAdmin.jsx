import React, { Component } from "react";
import { UserContext } from "../userContext";

export class AdminDashbord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: this.props.isAdmin
    };

    this.importFile = React.createRef();
  }

  dowloadTraduction() {
    Meteor.call("traduction.getAll", (err, res) => {
      if (err) {
        alert(err);
      } else {
        const traductions = JSON.stringify(res);
        const link = document.createElement("a");
        const fileType = "data:text/plain;charset=utf-8,";
        const fileName = "traduction_" + JSON.stringify(Date.now()) + ".json";
        link.setAttribute("href", fileType + encodeURIComponent(traductions));
        link.setAttribute("download", fileName);

        link.style.display = "none";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      }
    });
  }

  importTraduction() {
    const file = this.importFile.current.files[0];
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      Meteor.call("traduction.importFromFile", reader.result, (err, res) => {
        if (!err) {
          Bert.alert("Fichier importer", "success", "growl-top-right");
        }
      });
    };
  }

  createTraduction() {
    Meteor.call("traduction.factoryTraduction", (err, res) => {
      if (!err) {
        Bert.alert(
          "Traduction " + res + " créer",
          "success",
          "growl-top-right"
        );
      }
    });
  }

  render() {
    return (
      <div className="admin">
        <div className="d-flex p-2 justify-content-between">
          <h1>Page Administateur</h1>
          <UserContext.Consumer>
            {UserContext => (
              <div onClick={() => UserContext.setAdmin(!UserContext.isAdmin)}>
                <button
                  className={
                    UserContext.isAdmin ? "btn btn-success" : "btn-warning"
                  }
                >
                  Admin mode {UserContext.isAdmin ? "On" : "Off"}
                </button>
              </div>
            )}
          </UserContext.Consumer>
        </div>

        <br />

        <div className="card">
          <div className="card-header bg-dark text-white">
            Récupération de données
          </div>

          <div className="card-body">
            <div className="d-flex p-2 justify-content-around">
              <button className="btn btn-dark" onClick={this.dowloadTraduction}>
                Télécharger toutes les traductions
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => this.importFile.current.click()}
              >
                Importer des traductions
                <input
                  ref={this.importFile}
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={() => this.importTraduction()}
                />
              </button>

              <button
                className="btn btn-info"
                onClick={() => this.createTraduction()}
              >
                Créer une traduction
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
