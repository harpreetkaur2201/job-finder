"use strict";


/* -----------------------------
   Helper functions (same as notes)
------------------------------*/
function getElement(id) {
    return document.getElementById(id);
}


function select(selector) {
    return document.querySelector(selector);
}


function listen(event, element, callback) {
    element.addEventListener(event, callback);
}


/* -----------------------------
   FETCH USERS (teacher's .then() style)
------------------------------*/


function loadUsers() {


    const URL = "https://randomuser.me/api/?results=10&nat=CA";


    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/JSON; charset=UTF-8"
        },
        mode: "cors"
    };


    fetch(URL, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            showUsers(data.results);
        })
        .catch(function(error) {
            console.log("Error:", error);
        });
}


/* -----------------------------
   DISPLAY USERS (beginner friendly)
------------------------------*/


function showUsers(list) {


    let box = getElement("suggestions");
    box.innerHTML = ""; // clear old items


    for (let i = 0; i < list.length; i++) {


        let user = list[i];


        let pic = user.picture.medium;
        let fullName = user.name.first + " " + user.name.last;
        let city = user.location.city;


        let div = document.createElement("div");
        div.className = "suggest-card";


        div.innerHTML =
            "<img class='suggest-photo' src='" + pic + "'>" +
            "<p class='suggest-name'>" + fullName + "</p>" +
            "<p class='suggest-city'>" + city + "</p>";


        box.appendChild(div);
    }
}


/* -----------------------------
   LIKE BUTTONS (same style as yours)
------------------------------*/


function setupLikes() {


    let like1 = getElement("likeBtn1");
    let count1 = getElement("likeCount1");


    listen("click", like1, function() {
        let num = Number(count1.innerText);
        count1.innerText = num + 1;
    });


    let like2 = getElement("likeBtn2");
    let count2 = getElement("likeCount2");


    listen("click", like2, function() {
        let num = Number(count2.innerText);
        count2.innerText = num + 1;
    });
}


/* -----------------------------
   COMMENT BUTTON FIX
------------------------------*/


function setupComments() {


    let c1 = getElement("commentBtn1");
    let count1 = getElement("commentCount1");


    listen("click", c1, function () {
        let num = Number(count1.innerText);
        count1.innerText = num + 1;
    });


    let c2 = getElement("commentBtn2");
    let count2 = getElement("commentCount2");


    listen("click", c2, function () {
        let num = Number(count2.innerText);
        count2.innerText = num + 1;
    });
}


/* -----------------------------
   PAGE LOAD
------------------------------*/


window.onload = function() {
    loadUsers();     // fetch "people you may know"
    setupLikes();    // like buttons
    setupComments(); // comment buttons now working
};