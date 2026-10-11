/**
 * Axios is an open-source JavaScript library used to make asynchronous HTTP requests 
 * from web browsers or Node.js environments to REST or GraphQL APIs
 */
const axios = require("axios");

async function githubProfileDetails(username) {

    try {

        /**
         * When we use Axios to make a GET request to https://github.com/username, 
         * a new Promise is created, which is initially in the pending state.
         * 
         * After some time, when we receive a response from the GitHub server, 
         * the Promise's state changes depending on the HTTP status code.
         * 
         * i.e., Axios will automatically reject the promise if the status code is outside the 
         * range of 200 - 299
         * 
         * 
        Common Scenarios Where Axios Rejects : 

        • HTTP Error Status Codes: Any response with a status code other than 2xx 
        (e.g., 400 Bad Request, 401 Unauthorized, 404 Not Found, or 500 Internal Server Error) triggers a rejection.

        • Network Failures: If the client is offline or the server is unreachable, 
        the promise rejects with a network error.

        • Timeouts: If the request exceeds the time limit specified in the timeout config option,
         Axios rejects with an ECONNABORTED error code (or ETIMEDOUT if configured).

        • Request Cancellation: When a request is aborted using an AbortController or cancel token, 
        the promise rejects with a cancellation error
         */

        const isUserNameExist = await axios.get(`https://github.com/${encodeURIComponent(username)}`);

        /**
         * If there are no issues with the above request, i.e., if the Promise is resolved,
         * it indicates that the provided username is valid and a GitHub profile exists for that username.
         * 
         * Now, we are using the GitHub API URL to fetch the user's details by making a GET request
         * to the URL provided below.
         */

        const userDetails = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`);

        /**
         * Once we receive the response from the server, the data returned by the server 
         * will be stored in the data key of the Axios response object.
         */

        const userData = userDetails.data;

        /**
         * Here, we are accessing the required information from the data property of the Axios response object
         * and printing it to the console.
         */

        console.log(`Name: The ${userData.login}`);
        console.log(`UserName: ${userData.login}`);
        console.log(`Profile: https://github.com/${encodeURIComponent(username)}`);
        console.log(`Public repos: ${userData.public_repos}`);
        console.log(`Followers: ${userData.followers}`);
    } catch (error) {
        /**
         * If an error occurs while making a GET request using Axios, the Promise is rejected,
         * and the program control reaches the catch block, where we can handle the error.
         */
        console.log(`error: GitHub user not found` , error);
    }
    
}

// printing the command line arguments which are passed from the terminal
console.log(process.argv);

const processArguments = process.argv;
const noOfArguments = processArguments.length;

/**
 * If the username is not provided, we prompt the user to enter a username.
 */
if(noOfArguments <= 2) {
    console.error(`error: please provide a GitHub username`);
    process.exit(2);
}

const username = processArguments[2];

console.log(`Username is : ${username}`);

githubProfileDetails(username);