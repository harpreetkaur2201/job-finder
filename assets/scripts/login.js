'use strict';

function getElement(id, scope = document) {
    return scope.getElementById(id);
}

function listen(event, element, callback) {
    return element.addEventListener(event, callback);
}

localStorage.setItem("username", "daljit@test.com");
localStorage.setItem("password", "Test1234!");

const username = getElement("username");
const password = getElement("password");
const loginBtn = getElement("loginBtn");
const errorMsg = getElement("errorMessage");

listen("click", loginBtn, function () {

    const user = username.value;
    const pass = password.value;

    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    if (user === "") {
        errorMsg.textContent = "Please enter username.";
    }
    else if (pass === "") {
        errorMsg.textContent = "Please enter password.";
    }
    else if (user !== storedUser || pass !== storedPass) {
        errorMsg.textContent = "Incorrect login details.";
    }
    else {
        errorMsg.textContent = "";
        localStorage.setItem("loggedIn", "true");
        window.location.assign("home.html");
    }
});
