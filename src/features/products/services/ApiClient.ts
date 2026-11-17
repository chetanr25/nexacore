import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// 1. Get Product - When we click on a product
// 2. Add a Product - Add in admin module
// Take one get and one post in your Aurora your respective features - implement
// for your features axios one get and one post

const apiClient = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,
    withCredentials: false,
    responseType: "json",
    responseEncoding: "utf-8",
    maxContentLength: 1000000,
    maxBodyLength: 1000000,
    validateStatus: (status) => status >= 200 && status < 300,
    adapter: "fetch",
});

export default apiClient;