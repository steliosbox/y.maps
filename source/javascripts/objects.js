'use strict';

module.exports = {
    
    placemark: (data) => {
        
        let { coords, address, place, name, comment, time } = data;
        let placemark = new ymaps.Placemark(coords,
            {
                coords: coords,
                place: place,
                name: name,
                comment: comment,
                time: time,
                address: address,
                balloonContentHeader: place,
                balloonContentBody: `<div class="baloon-content">
                                <a href="#" class="placelink" data-coords="${coords.join()}">${place}</a>
                                <br>${name}: ${comment}</div>`,
                balloonContentFooter: `<div class="baloon-footer">${time}</div>`
            },
            {
                preset: 'islands#blueIcon',
                openBalloonOnClick: false
            }
        );
        let commentObj = ymaps.commentObj || [];
            commentObj.push(data);
        
        ymaps.commentObj = commentObj;
        ymaps.clusterer.add(placemark);
    },
    
    geoCoder: coords => {
        
        return ymaps.geocode(coords)
            .then(result => result.geoObjects.get(0).properties.get('name'));
    }
};