'use strict';

// Helper function to create an element with classes and content
function createElement(tag, classNames = [], textContent = '') {
    const el = document.createElement(tag);
    if (classNames.length > 0) el.classList.add(...classNames);
    if (textContent) el.textContent = textContent;
    return el;
}

// Fetch 10 random users from Random User API
async function fetchRandomUsers(count = 10) {
    try {
        const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

// Render users in the #suggestions container
function renderUsers(users) {
    const container = document.getElementById('suggestions');
    container.innerHTML = ''; // Clear container first

    users.forEach(user => {
        const userCard = createElement('div', ['user-card']);

        const img = createElement('img', ['user-photo']);
        img.src = user.picture.medium;
        img.alt = `${user.name.first} ${user.name.last}`;

        const name = createElement('p', ['user-name'], `${user.name.first} ${user.name.last}`);
        const city = createElement('p', ['user-city'], user.location.city);

        userCard.append(img, name, city);
        container.appendChild(userCard);
    });
}

// Initialize function
async function init() {
    const users = await fetchRandomUsers(10);
    renderUsers(users);
}

// Run initialization on page load
window.addEventListener('DOMContentLoaded', init);
