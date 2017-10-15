'use strict';

module.exports = {
    
    mapClick: function (e, callback) {
        
        callback({
            type: 'map',
            position: e.get('position'),
            coords: e.get('coords')
        });
    },
    
    geoClick: function (e, callback) {
        
        if (!e.get('target').properties.get('geoObjects', null)) {
        
            callback({
                type: 'placemark',
                target: e.get('target'),
                position: e.get('position'),
                coords: e.get('target').geometry.getCoordinates()
            });
        }
    },
    
    click: function (callback) {
        
        ymaps.map.events.add('click', e => {
            
            this.mapClick(e, callback);
        });
        
        ymaps.map.geoObjects.events.add('click', e => {
            
            this.geoClick(e, callback);
        });
    },
    
    // onMapClick: function (callback) {
    //
    //     ymaps.map.events.add('click', function (e) {
    //
    //         callback({
    //             position: e.get('position'),
    //             coords: e.get('coords')
    //         });
    //     });
    // },
    
    // onGeoClick: function (callback) {
    //
    //     ymaps.map.geoObjects.events.add('click', function (e) {
    //
    //         let target = e.get('target'),
    //             coords = target.geometry.getCoordinates(),
    //             geoObjects = target.properties.get('geoObjects', null);
    //
    //         if (!geoObjects) {
    //
    //             callback({
    //                 position: e.get('position'),
    //                 coords: coords,
    //                 target: target
    //             });
    //         }
    //     });
    // }
};