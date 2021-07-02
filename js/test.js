// Call API to get user data
const getUsers = async function(n_users) {
    const response = await fetch('https://randomuser.me/api/?results=' + n_users);
    const data = await response.json();
​
    return data.results;
};
​
// Takes user data, returns name string
const getHumanName = function (user) {
    const nameJSON = user.name;
    const humanName = nameJSON.title + ' ' + nameJSON.first + ' ' + nameJSON.last;
​
    return humanName;
}
​
// Takes a user and adds it to DOM
const addUserToDOM = function(user) {
    // Create HTML elements
    const userList = document.getElementById('studentList');
    const listItem = document.createElement('li');
​
    // Get name and create text element
    const nameHeader = document.createElement('h3');
    const userName = getHumanName(user);
    const userTextElem = document.createTextNode(userName);
    nameHeader.appendChild(userTextElem);
​
    // Create img element
    const imgUrl = user.picture.large;
    const imgElem = document.createElement('img');
    imgElem.setAttribute('src', imgUrl);
​
    // Stick it together
    listItem.appendChild(imgElem);
    listItem.appendChild(nameHeader);
​
    userList.appendChild(listItem);
};
​
// Main function
const showStudents = async function() {
    // Get users
    const users = await getUsers(10);
    console.log("User data:")
    console.log(users);
​
    // Add all users to DOM
    users.map(user => addUserToDOM(user));
};
​
showStudents();