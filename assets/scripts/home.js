'use strict';



function getElement(id) {
    return document.getElementById(id);
}

function select(selector) {
    return document.querySelector(selector);
}

function listen(event, element, callback) {
    element.addEventListener(event, callback);
}



function loadPeople() {

    const URL = 'https://randomuser.me/api/?results=14&nat=CA';

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/JSON; charset=UTF-8'
        },
        mode: 'cors'
    };

    fetch(URL, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showPeople(data.results);
        })
        .catch(function (error) {
            console.log('Fetch error:', error);
        });
}



function showPeople(list) {

    let box = getElement('suggestions');
    box.innerHTML = '';

    for (let i = 0; i < list.length; i++) {

        let user = list[i];

        let photo = user.picture.medium;  
        let name = user.name.first + ' ' + user.name.last; 
        let city = user.location.city;

        let div = document.createElement('div');

        div.innerHTML ="<img src='" + photo + "' alt='User photo'>" + "<p>" + name + ", " + city + "</p>";

        box.appendChild(div); 
    }
}



function setupPost() {

    let postBtn = select('.post-btn');
    let textarea = select('.post-box textarea');

    listen('click', postBtn, function () {

        let text = textarea.value.trim();

        if (text === '') {
            console.log('Post is empty');
            return;
        }

        console.log('Post submitted:', text);

        textarea.value = ''; 
    });
}



window.onload = function () {
    loadPeople();
    setupPost();
};
