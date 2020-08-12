import axios from 'axios';
import { BASE_URL } from './Global';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers["Content-Type"] = "application/json";
axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = "Bearer " + token
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    },
);

export default class Api {

    static async get(path, params) {
        try {
            const res = await axios.get(path, params)
            return res.data
        } catch (error) {
            throw error.response
        }
    }

    static async patch(path, params) {
        try {
            const res = await axios.patch(path, params)
            return res.data
        } catch (error) {
            throw error.response
        }
    }

    static async post(path, params) {
        try {
            const res = await axios.post(path, params)
            return res.data
        } catch (error) {
            throw error.response
        }
    }

    static async delete(path, params) {
        try {
            const res = await axios.delete(path, params)
            return res.data
        } catch (error) {
            throw error.response
        }
    }

    static async put(path, params) {
        try {
            const res = await axios.put(path, params)
            return res.data
        } catch (error) {
            throw error.response
        }
    }


}