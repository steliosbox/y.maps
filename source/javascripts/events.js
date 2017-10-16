'use strict';

let popup = require('./popup');
let objects = require('./objects');

module.exports = {
    
    correntCoords: null,
    
    _openPopup: function (data) {
        
        map.objects.geoCoder(data.coords)
            .then(address => {
                
                data.address = address;
                
                popup.open(data);
            });
    },
    
    _closePopup: function () {
        
        popup.close();
    },
    
    _addPlacemark: function () {
        
        let data = popup.getData();
        
        if (data) {
            
            data.coords = this.correntCoords;
            objects.placemark(data);
            popup.appendComment(data);
        }
    },
    
    _onMapClick: function (e) {
        
        ymaps.map.balloon.close();
        
        objects.geoCoder(e.get('coords')).then(address => {
            
            popup.open({
                type: 'map',
                position: e.get('position'),
                address: address
            });
        });
        
        this.correntCoords = e.get('coords');
    },
    
    _onGeoClick: function (e) {
        
        let target = e.get('target');
        
        if (!target.properties.get('geoObjects', null)) {
            
            ymaps.map.balloon.close();
            
            popup.open({
                type: 'placemark',
                target: target,
                position: e.get('position'),
                coords: target.geometry.getCoordinates(),
                comments: [target.properties.get(0)],
                address: target.properties.get(0).address
            });
            
        } else {
            // console.log(target);
            popup.close();
        }
    },
    
    _onLinkClick: function (e) {
        
        let commentObj = ymaps.commentObj;
        let correntCoords = e.target.dataset.coords;
        let correntComments = [];
        
        commentObj.forEach((comment) => {
            
            let coords = comment.coords.join();
            
            if (correntCoords === coords) {
                
                correntComments.push(comment);
            }
        });

        ymaps.map.balloon.close();
        
        popup.open({
            position: [e.clientX, e.clientY],
            address: correntComments[0].address,
            comments: correntComments
        });
    },
    
    click: function () {
        
        // клик по карте
        ymaps.map.events.add('click', e => {
            
            this._onMapClick(e);
        });
        
        // клик по гео обьектам
        ymaps.map.geoObjects.events.add('click', e => {
            
            this._onGeoClick(e);
        });
        
        // отслеживание клика мыши
        document.body.addEventListener('click', e => {
            
            e.preventDefault();
            
            if (e.target.closest('.header__close')) {
                
                this._closePopup();
            }
            
            if (e.target.closest('.footer__button')) {
                
                this._addPlacemark();
            }
            
            if (e.target.closest('.placelink')) {
                
                this._onLinkClick(e);
            }
        });
    }
};