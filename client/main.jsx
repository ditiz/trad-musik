import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Menu } from "./app/menu";

Meteor.startup(() => {
  render(<Menu />, document.getElementById('react-target'));
});
