import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

export const apiClient = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});



// configure all at one place
// singleton pattern