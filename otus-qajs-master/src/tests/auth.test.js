import { UserService } from '../specs/user.spec';
const { test, expect, request } = require('@playwright/test');

const BASE_URL = 'https://bookstore.demoqa.com/Account/v1/Authorized';
const DELETE_URL = 'https://bookstore.demoqa.com/Account/v1/User/{UUID}';
const GET_USER_URL = 'https://bookstore.demoqa.com/Account/v1/User/{UUID}';

test.describe('API Tests for User Management', () => {
    let apiContext;
    let userService;
    const validUserName = 'valid_user'; 
    const validPassword = 'valid_password'; 

    test.beforeAll(async () => {
        apiContext = await request.newContext();
        userService = new UserService(apiContext);
    });

    test('Should return 404 for non-existing user', async () => {
        const response = await userService.auth({
            userName: 'non_existing_user',
            password: 'wrong_password'
        });

        const responseBody = await response.json();
        
        expect(response.status()).toBe(404);
        expect(responseBody).toEqual({
            code: "1207",
            message: "User not found!"
        });
    });

    test('Should return 400 for invalid request', async () => {
        const response = await userService.auth({
            userName: '',
            password: ''
        });

        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody).toEqual({
            code: "1200",
            message: "UserName and Password required."
        });
    });

    test('Should return 200 for valid user', async () => {
        const response = await userService.auth({
            userName: validUserName,
            password: validPassword
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(expect.any(Boolean));
    });

    test('Should return user information successfully', async () => {
        const response = await userService.getUser(validUserName);

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            userId: validUserName,
            username: validUserName,
            books: expect.any(Array)
        });
    });

    test('Should return 401 for unauthorized user information request', async () => {
        const response = await userService.getUser('invalid_user_id');

        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            code: "1200",
            message: "User not authorized!"
        });
    });

    test('Should return 200 for successful user deletion', async () => {
        const userId = validUserName; 
        const response = await userService.deleteUser(userId);

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            code: 0,
            message: expect.any(String)
        });
    });

    test('Should return 401 for unauthorized user deletion', async () => {
        const userId = 'invalid_user_id';
        const response = await userService.deleteUser(userId);

        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            code: "1200",
            message: "User not authorized!"
        });
    });
});