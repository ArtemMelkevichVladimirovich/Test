import { AsyncStorage } from "react-native";

const TOKEN_KEY = 'token';

class AuthService {

    token = null;
    onStart = function (token) { };

    static init() {
        if (this.token) return;

        AsyncStorage.getItem(TOKEN_KEY)
            .then(token => {
                this.token = token;
                this.onStart(token);
            });
    }

    static setToken(token) {
        AsyncStorage.setItem(TOKEN_KEY, token);
        this.token = token;
    }

    static getToken() {
        return this.token;
    }

    static issetToken() {
        return !!AsyncStorage.getItem(TOKEN_KEY);
    }

    static setOnStart(callback) {
        this.onStart = callback;
    }

    static deleteToken() {
        AsyncStorage.removeItem(TOKEN_KEY);
        this.token = null;
    }

}

export default AuthService;