import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.startup(() => {
  // Setup SMTP
  let username = process.env.SMTP_USERNAME;
  let password = process.env.SMTP_PASSWORD;
  let server = process.env.SMTP_SERVER;
  let port = process.env.SMTP_PORT;

  // Email server adress
  process.env.MAIL_URL =
    "smtps://" +
    encodeURIComponent(username) +
    ":" +
    encodeURIComponent(password) +
    "@" +
    encodeURIComponent(server) +
    ":" +
    port;

  // Edit email verification
  customVerificationEmail();

  // Custom reset mail

  // Activate verification email
  Accounts.config({
    sendVerificationEmail: true,
  });

  // Custom verify email url
  Accounts.urls.verifyEmail = function (token) {
    return Meteor.absoluteUrl("verify-email?token=" + token);
  };

  // Custom reset email url
  Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl("reset-password/" + token);
  };
});

function customVerificationEmail() {
  Accounts.emailTemplates.verifyEmail.from = () => {
    return "Traduction-musik";
  };

  Accounts.emailTemplates.verifyEmail.subject = (user) => {
    return "Vérification de votre adresse email";
  };

  Accounts.emailTemplates.verifyEmail.text = (user, url) => {
    return "Cliquer sur le lien suivant pour activé votre compte: " + url;
  };
}

function customVerificationEmail() {
  Accounts.emailTemplates.resetPassword.from = () => {
    return "Traduction-musik";
  };

  Accounts.emailTemplates.resetPassword.subject = (user) => {
    return "Réinitialisation de votre mot de passe";
  };

  Accounts.emailTemplates.resetPassword.text = (user, url) => {
    return (
      "Cliquer sur le lien suivant pour " +
      "réinitialiser le mot de passe de votre votre compte:" +
      url
    );
  };
}
