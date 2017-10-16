'use strict';

module.exports = {
    
    geolocation: function () {
        return ymaps.geolocation.get({ provider: 'auto' })
            .then(result => result.geoObjects.position);
    },
    
    map: function (coords) {
        let map = document.querySelector('#map-id');
        
        ymaps.map = new ymaps.Map(map, {
            center: coords,
            zoom: 10
        });
    },
    
    clusterer: function () {
        ymaps.clusterer = new ymaps.Clusterer({
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterDisableClickZoom: true,
            openBalloonOnClick: true
        });
        
        ymaps.map.geoObjects.add(ymaps.clusterer);
    },
    
    init: function () {
        return this.geolocation()
            .then((coords) => this.map(coords))
            .then(() => this.clusterer());
    }
};