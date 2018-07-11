import $ from 'jquery';
const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_HJm2GQqGQ";
const kinveyAppSecret = "29e549099c1b4d67a994149af14e8e24";

// Creates the authentication header
function makeAuth(type) {
    return type === 'basic'
        ? 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
        : 'Kinvey ' + sessionStorage.getItem('authtoken');
}

// Creates request object to kinvey
function makeRequest(method, module, endpoint, auth, id) {
    let url = id ?
        kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint + '/' + id :
        kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint
    return {
        method,
        url: url,
        headers: {
            'Authorization': makeAuth(auth)
        }
    };
}

// Function to return GET promise
function get(module, endpoint, auth) {
    return $.ajax(makeRequest('GET', module, endpoint, auth));
}

function getById(module, endpoint, auth, id) {
    return $.ajax(makeRequest('GET', module, endpoint, auth, id));
}

// Function to return POST promise
function post(module, endpoint, auth, data) {
    let req = makeRequest('POST', module, endpoint, auth);
    req.data = data;
    return $.ajax(req);
}

// Function to return PUT promise
function update(module, endpoint, auth, data, id) {
    let req = makeRequest('PUT', module, endpoint, auth, id);
    req.data = data;
    return $.ajax(req);
}

// Function to return DELETE promise
function remove(module, endpoint, auth, data) {
    let req = makeRequest('DELETE', module, endpoint, auth, data);
    req.data = data;
    return $.ajax(req);
    // return $.ajax(makeRequest('DELETE', module, endpoint, auth));
}

export default {
    get,
    getById,
    post,
    update,
    remove
}