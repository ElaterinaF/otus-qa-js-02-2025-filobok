export class UserService {
    constructor(request) {
        this.request = request;
    }

    async auth({ userName, password }) {
        const response = await this.request.post(BASE_URL, {
            data: {
                userName,
                password
            },
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return response;
    }
    async getUser(userId) {
        const response = await this.request.get(GET_USER_URL.replace('{UUID}', userId), {
            headers: {
                'accept': 'application/json',
            },
        });
        return response;
    }

    async deleteUser(userId) {
        const response = await this.request.delete(DELETE_URL.replace('{UUID}', userId), {
            headers: {
                'accept': 'application/json',
            },
        });
        return response;
    }
}