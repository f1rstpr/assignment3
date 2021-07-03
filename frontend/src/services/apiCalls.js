import axios from "axios";

class ApiCalls {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "lifetracker_token";
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    getToken() {
        return {
            token: this.token,
            local: localStorage.getItem(this.tokenName),
        };
    }

    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;

        const headers = {
            "Content-Type": "application/json",
            Authorization: this.token ? `Bearer ${this.token}` : "",
        };

        try {
            const res = await axios({ url, method, data, headers });
            return { data: res.data, error: null };
        } catch (error) {
            console.error("APIclient.makeRequest.error:");
            console.error({ errorResponse: error.response });
            const message = error?.response?.data?.error?.message;
            return { data: null, error: message || String(error) };
        }
    }

    async register(credentials) {
        return await this.request({
            endpoint: `auth/register`,
            method: `POST`,
            data: credentials,
        });
    }

    async login(credentials) {
        return await this.request({
            endpoint: `auth/login`,
            method: `POST`,
            data: credentials,
        });
    }

    async getCurUser() {
        return await this.request({ endpoint: `auth/cur`, method: `GET` });
    }

    async logout() {
        this.setToken(null);
        localStorage.setItem(this.tokenName, "");
    }

    async getCurActivity(type) {
        return await this.request({
            endpoint: `activities/${type}`,
            method: `GET`,
        });
    }

    async saveActivity(type, data) {
        return await this.request({
            endpoint: `activities/${type}`,
            method: `POST`,
            data: data,
        });
    }

    async getTotalDurationEx() {
        return await this.request({
            endpoint: `activities/stats/totalDurationEx`,
            method: `GET`,
        });
    }

    async getAvgCalories() {
        return await this.request({
            endpoint: `activities/stats/avgCalories`,
            method: `GET`,
        });
    }

    async getAvgIntensity() {
        return await this.request({
            endpoint: `activities/stats/avgIntensity`,
            method: `GET`,
        });
    }
}

const API = new ApiCalls(
    process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"
);

export default API;
