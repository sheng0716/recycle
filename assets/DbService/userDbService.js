import axios from 'axios';

let config = require('../../Config');
let pre_url = config.settings.serverPath;

function transformUserData(response) {
    return {
        userId: response[0],
        username: response[1],
        email: response[3],
        phoneNumber: response[4],
    };
}

const getUserDataByUserId = async (userId) => {
    try {
        const response = await axios.get(`${pre_url}/api/users/userId=${userId}`);
        return transformUserData(response.data.userData[0]); // get the first one, only one
    } catch (error) {
        console.error(error);
        throw error;
    }
}
// Function to update user data
const updateUser = async (userId, newData) => {
    try {
        const response = await axios.put(`${pre_url}/api/users/userId=${userId}`, newData);
        return response.data.message;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to perform user login
const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${pre_url}/api/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to check if an email is unique
const registerUser = async (newUser) => {
    try {
        const response = await axios.post(`${pre_url}/api/register`, newUser);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    getUserDataByUserId,
    updateUser,
    loginUser,
    registerUser,
}