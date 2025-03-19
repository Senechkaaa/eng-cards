export default class TokenService {
    static setAccessToken(accessToken: string) {
        localStorage.setItem('token', accessToken)
    }

    static deleteAccessToken() {
        localStorage.removeItem('token')
    }

    static getAccessToken() {
        return localStorage.getItem('token')
    }
}
