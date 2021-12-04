import React, { useEffect, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { DisplayTraduction } from "./displayTraduction";
import { ListAllTraduction } from "./listAllTraduction";
import { ButtonFilterTraduction } from "./buttonFilterTraduction";
import { useMatch } from "react-location";

export const ListingTraduction = () => {
  const {
    data: { user, artist },
  } = useMatch();

  const [traductions, setTraductions] = useState([]);
  const [currentUser, setCurrentUser] = useState(user);
  const [currentArtist, setCurrentArtist] = useState(artist);
  const [listingStyle, setListingStyle] = useState("block");

  const messageForNotSecure = useRef();

const getTraductionByUserId = useMemo((userId) => {
      if (Meteor.userId()) {
        Meteor.call("traduction.getByUser", userId, (err, res) => {
          if (err) {
            alert("Erreur");
          } else {
            if (res.length == 0) {
              Bert.alert(
                "Vous n'avez pas de traduction pas l'instant",
                "info",
                "growl-bottom-right"
              );
            }

            setTraductions(res);
            setCurrentUser(userId);
          }
        });
      } else {
        Bert.alert(
          "Vous devez vous connectez pour voir vos traductions",
          "warning",
          "growl-top-right"
        );
      }
    });

  const getAllTraduction = useMemo(() => {
    Meteor.call("traduction.getAll", (error, result) => {
      if (error) {
        Bert.alert(
          "Erreur, veuillez contacter un administrateur",
          "danger",
          "growl-top-right"
        );
      } else {
        const allTraduction = result;

        setTraductions(allTraduction);
        setCurrentUser("");
        setCurrentArtist("");
      }
    });
  });

  useEffect(() => {
    const getTraductionByUserId = (userId) => {
      if (Meteor.userId()) {
        Meteor.call("traduction.getByUser", userId, (err, res) => {
          if (err) {
            alert("Erreur");
          } else {
            if (res.length == 0) {
              Bert.alert(
                "Vous n'avez pas de traduction pas l'instant",
                "info",
                "growl-bottom-right"
              );
            }

            setTraductions(res);
            setCurrentUser(userId);
          }
        });
      } else {
        Bert.alert(
          "Vous devez vous connectez pour voir vos traductions",
          "warning",
          "growl-top-right"
        );
      }
    };

    const getTraductionByArtistName = (artistName) => {
      Meteor.call("traduction.getByArtist", artistName, (err, res) => {
        if (err) {
          alert("Erreur");
        } else {
          setTraductions(res);
          setCurrentArtist(artistName);
        }
      });
    };

    const getAllTraduction = () => {
      Meteor.call("traduction.getAll", (error, result) => {
        if (error) {
          Bert.alert(
            "Erreur, veuillez contacter un administrateur",
            "danger",
            "growl-top-right"
          );
        } else {
          const allTraduction = result;

          setTraductions(allTraduction);
          setCurrentUser("");
          setCurrentArtist("");
        }
      });
    };

    setCurrentUser(user);
    setCurrentArtist(artist);

    if (user) {
      getTraductionByUserId(user);
    } else if (artist) {
      getTraductionByArtistName(artist);
    } else {
      getAllTraduction();
    }
  }, [user, artist, getAllTraduction]);

  const displayTraduction = (e) => {
    let liWithKey = e.target;

    while (!liWithKey.id) {
      liWithKey = liWithKey.parentNode;
    }

    const traduction = traductions.filter(
      (element) => element._id == liWithKey.id
    );

    render(
      <DisplayTraduction traduction={traduction[0]} />,
      document.getElementById("content")
    );
  };

  const search = () => {
    const search = document.getElementById("bar-search").value;

    Meteor.call("traduction.searchTraduction", search, (error, result) => {
      if (error) {
        alert("Erreur");
      } else {
        const allTraduction = result;
        setTraductions(allTraduction);
      }
    });
  };

  const changeStyle = () => {
    if (listingStyle == "block") {
      setListingStyle("list");
    } else {
      setListingStyle("block");
    }
  };

  const displayMessageForNotSecure = () => {
    messageForNotSecure.current.classList.remove("d-none");
  };

  return (
    <div className="container-fluid col-12" onLoad={displayMessageForNotSecure}>
      <div className="card">
        <div className="card-header text-white bg-dark">
          <h2>Liste des musiques traduites</h2>
          <ButtonFilterTraduction
            display={listingStyle}
            user={currentUser}
            artist={currentArtist}
            routeParams={{ artist, user }}
            changeStyle={changeStyle}
            getAllTraduction={getAllTraduction}
            getTraductionByUserId={() => getTraductionByUserId(Meteor.userId())}
          />
        </div>

        <div className="card-body form-group">
          <div className="container-fluid">
            <div className="row input-group">
              <input
                type="text"
                id="bar-search"
                onKeyUp={search}
                className="col-11 input-search"
              />
              <div className="input-group-append">
                <button className="bg-success button-search">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
            <hr />
          </div>

          <div className="row">
            <ListAllTraduction
              listingStyle={listingStyle}
              displayTraduction={displayTraduction}
              traductions={traductions}
            />
          </div>
        </div>
      </div>

      <br />

      <div
        ref={messageForNotSecure}
        className="d-none alert alert-info text-center"
      >
        Le navigateur peut considérer le site comme non sécurisé a cause des
        images qui ne sont pas en https
      </div>
    </div>
  );
};
