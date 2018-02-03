import React from "react";
import Config from "../config";
import AuthService from "./auth.service";

const TOKEN_PREFIX = 'Token';

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export default class Api {

    static get(url) {
        return this._getPromise(url, 'GET');
    }

    static post(url, body) {
        return this._getPromise(url, 'POST', body);
    }

    static _getPromise(url, method, body) {
        return fetch(Config.API_URL + url, {
            method: method,
            headers: this._getHeaders(),
            body: this._toJson(body),
        })
    }

    static _getAuthorizationHeader(token) {
        return {
            Authorization: `${TOKEN_PREFIX} ${token}`
        }
    }

    static _getHeaders() {
        if (AuthService.getToken()) {
            return Object.assign(
                DEFAULT_HEADERS,
                this._getAuthorizationHeader(AuthService.getToken())
            );
        } else {
            return DEFAULT_HEADERS;
        }
    }

    static _toJson(obj) {
        return JSON.stringify(obj);
    }
}