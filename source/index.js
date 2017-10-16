'use strict';

import './stylesheets/style.scss';
import './stylesheets/flaticon.scss';
import './stylesheets/popup.scss';
let map = require('./javascripts/ymaps');
let events = require('./javascripts/events');

ymaps.ready(() => {
    console.log('ymaps ready');
    map.init().then(() => events.click());
});