const { test, expect, request } = require('@playwright/test');

const BASE_URL = 'https://bookstore.demoqa.com/Account/v1/Authorized';
const DELETE_URL = 'https://bookstore.demoqa.com/Account/v1/User/{UUID}';
const GET_USER_URL = 'https://bookstore.demoqa.com/Account/v1/User/{UUID}';

test.describe('API Tests for User Management', () => {
    let apiContext;
    const validUserName = 'valid_user'; 
    const validPassword = 'valid_password'; 

    test.beforeAll(async () => {
        apiContext = await request.newContext();
    });

    test('Should return 404 for non-existing user', async () => {
        const response = await apiContext.post(BASE_URL, {
            data: {
                userName: 'non_existing_user',
                password: 'wrong_password'
            },
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const responseBody = await response.json();
        
        expect(response.status()).toBe(404);
        expect(responseBody).toEqual({
            code: "1207",
            message: "User not found!"
        });
    });

    test('Should return 400 for invalid request', async () => {
        const response = await apiContext.post(BASE_URL, {
            data: {
                userName: '',
                password: ''
            },
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody).toEqual({
            code: "1200",
            message: "UserName and Password required."
        });
    });

    test('Should return 200 for valid user', async () => {
        const response = await apiContext.post(BASE_URL, {
            data: {
                userName: validUserName,
                password: validPassword
            },
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(expect.any(Boolean));
    });

    test('Should return user information successfully', async () => {
        const response = await apiContext.get(GET_USER_URL.replace('{UUID}', validUserName), {
            headers: {
                'accept': 'application/json',
            },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            userId: validUserName,
            username: validUserName,
            books: expect.any(Array)
        });
    });

    test('Should return 401 for unauthorized user information request', async () => {
        const response = await apiContext.get(GET_USER_URL.replace('{UUID}', 'invalid_user_id'), {
            headers: {
                'accept': 'application/json',
            },
        });

        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            code: "1200",
            message: "User not authorized!"
        });
    });

    test('Should return 200 for successful user deletion', async () => {
        const userId = validUserName; 
        const response = await apiContext.delete(DELETE_URL.replace('{UUID}', userId), {
            headers: {
                'accept': 'application/json',
            },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            code: 0,
            message: expect.any(String)
        });
    });

    test('Should return 401 for unauthorized user deletion', async () => {
        const userId = 'invalid_user_id';
        const response = await apiContext.delete(DELETE_URL.replace('{UUID}', userId), {
            headers: {
                'accept': 'application/json',
            },
        });

        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            code: "1200",
            message: "User not authorized!"
        });
    });
});