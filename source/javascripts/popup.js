'use strict';

let popupHBS = require('../templates/popup.hbs');
let commentsHBS = require('../templates/comments.hbs');
let wrapper = document.querySelector('.popup__wrapper');
let empty = true;

module.exports = {
    
    _data: function () {
        
        return {
            address: wrapper.querySelector('.header__title'),
            name: wrapper.querySelector('.comment__author'),
            place: wrapper.querySelector('.comment__place'),
            comment: wrapper.querySelector('.comment__message')
        };
    },
    
    open: function (data) {
        
        let { position, address, comments } = data;
        
        wrapper.style.position = 'absolute';
        wrapper.style.top = position[1] + 'px';
        wrapper.style.left = position[0] + 'px';
        wrapper.innerHTML = popupHBS({address: address});
        
        let sql = document.querySelector('.sql');
        
        if(comments) {

            sql.innerHTML = commentsHBS({comments: comments});
        } else {
            
            sql.innerHTML = commentsHBS();
        }
    },
    
    close: function () {
        
        wrapper.innerHTML = '';
    },
    
    getData: function (callback) {
        
        let { name, place, comment, address } = this._data();
        
        if (name.value !== '' && place.value !== '' && comment.value !== '') {
            
            return {
                type: 'data',
                name: name.value,
                place: place.value,
                comment: comment.value,
                address: address.textContent,
                time: new Date().toLocaleString('lt')
            };
        }
        
        return false;
    },
    
    appendComment: function (data) {
        
        let sql = document.querySelector('.sql');
        let html = commentsHBS({comments: [data]});
        
        if (!data || empty) {
            sql.innerHTML = html;
            empty = false
        } else {
            sql.innerHTML += html
        }
    },
};