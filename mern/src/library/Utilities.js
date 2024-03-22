/**
 * This module provides functions for making various API requests related to user authentication,
 * retrieving questions, adding grades, and fetching grades.
 * 
 * Functions:
 * 1. getQuestions(difficulty): Retrieves trivia questions from an API based on the specified difficulty.
 * 2. addGrade(userName, grade): Adds a grade for the specified user.
 * 3. getLastGrades(userName): Retrieves the last grades for the specified user.
 * 4. login(userName, password): Logs in a user with the provided credentials.
 * 5. addUser(userName, password): Registers a new user with the provided credentials.
 */

/**
 * Retrieves trivia questions from an API based on the specified difficulty.
 * @param {string} difficulty - The difficulty level of the questions (Easy, Medium, Hard).
 * @returns {Promise<object>} - A Promise that resolves with the retrieved trivia questions data.
 */
const getQuestions = (difficulty) => {
    return new Promise((resolve, reject) => {
        let url = "";
        switch(difficulty) {
            case "Easy":
                url =  "https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple";
                break;
            case "Medium":
                url =  "https://opentdb.com/api.php?amount=10&category=28&difficulty=medium&type=multiple";
                break;
            case "Hard":
                url =  "https://opentdb.com/api.php?amount=10&category=28&difficulty=hard&type=multiple";
                break;
            default: 
                console.error("Error while trying to get questions")
        }
        fetch(url)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    });
};

/**
 * Adds a grade for the specified user.
 * @param {string} userName - The username of the user.
 * @param {number} grade - The grade to be added.
 * @returns {Promise<object>} - A Promise that resolves with the response data from the server.
 */
const addGrade = (userName, grade) => {
    return new Promise((resolve, reject) => {
        let requestInit = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ userName, grade })
        };
        fetch("/api/user/add/grade", requestInit)
            .then(res => resolve(res.json()))
            .catch(err => reject(err))
    });
};

/**
 * Retrieves the last grades for the specified user.
 * @param {string} userName - The username of the user.
 * @returns {Promise<object>} - A Promise that resolves with the response data containing the last grades.
 */
const getLastGrades = (userName) => {
    return new Promise((resolve, reject) => {
        let requestInit = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ userName })
        };
        fetch("/api/user/grades", requestInit)
            .then(res => resolve(res.json()))
            .catch(err => reject(err))
    });
};

/**
 * Logs in a user with the provided credentials.
 * @param {string} userName - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - A Promise that resolves with the response data from the server.
 */
const login = (userName, password) => {
    return new Promise((resolve, reject) => {
        let requestInit = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ userName, password })
        };
        fetch("/api/login", requestInit)
            .then(res => resolve(res.json()))
            .catch(err => reject(err))
    });
};

/**
 * Registers a new user with the provided credentials.
 * @param {string} userName - The username of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise<object>} - A Promise that resolves with the response data from the server.
 */
const addUser = (userName, password) => {
    return new Promise((resolve, reject) => {
        let temp = { userName, password };
        let requestInit = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(temp)
        };
        fetch("/api/register", requestInit)
            .then(res => resolve(res.json()))
            .catch(err => reject(err))
    });
};

// Exported object containing all API request functions
export const ApiRequests = {
    getQuestions,
    addGrade,
    getLastGrades,
    login,
    addUser
};
