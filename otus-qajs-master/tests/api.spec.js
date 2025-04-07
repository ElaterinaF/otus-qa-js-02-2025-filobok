import { UserGenerator } from '../src/specs/user.spec';
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://bookstore.demoqa.com/Account/v1/User';

test.describe('API Tests for User Creation and Token Generation', () => {
  
  test('Создание пользователя с ошибкой, логин уже используется', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: {
        userName: "existingUser",
        password: "ValidPass1!"
      }
    });
    expect(response.status()).toBe(406);
    const responseBody = await response.json();
    expect(responseBody.code).toBe("1300");
    expect(responseBody.message).toContain("логин уже используется");
  });

  test('Создание пользователя с ошибкой, пароль не подходит', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: {
        userName: "newUser",
        password: "short"
      }
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.code).toBe("1300");
    expect(responseBody.message).toContain("Passwords must have at least one non alphanumeric character");
  });

  test('Создание пользователя успешно', async ({ request }) => {
    const userName = UserGenerator.genName(); 
    const password = UserGenerator.genPassword();

    const response = await request.post(BASE_URL, {
      data: {
        userName: userName,
        password: password
      }
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('userID'); 
    expect(responseBody.username).toBe(userName); 
  });

  test('Генерация токена с ошибкой', async ({ request }) => {
    const response = await request.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      data: {
        userName: "nonExistentUser",
        password: "InvalidPass!"
      }
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.code).toBe("1300");
    expect(responseBody.message).toContain("неверный логин или пароль");
  });

  test('Генерация токена успешно', async ({ request }) => {
    const response = await request.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      data: {
        userName: "newUser123", 
        password: "ValidPass1!"
      }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });
});