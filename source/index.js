import './stylesheets/style.scss';
let map = require('./ymaps');
// let mapEvents = require('./ymaps/ymap.events');

ymaps.ready(() => {
    
    console.log('ymaps ready');
    
    map.init().then(function () {
    
        map.events.click(function (data) {
            
            console.log(data);
        });
    })
});