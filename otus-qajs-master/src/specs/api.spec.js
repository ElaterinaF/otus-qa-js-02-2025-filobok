const axios = require('axios');

const BASE_URL = 'https://bookstore.demoqa.com/Account/v1/User';

describe('API Tests for Bookstore', () => {
  let userId;

  test('Создание пользователя с ошибкой, пароль не подходит', async () => {
    const newUser = {
      userName: 'newUser',
      password: 'short'
    };

    try {
        const response = await axios.post(`${BASE_URL}/User`, newUser, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        expect(response.status).toBe(400);
    } catch (error) {
        if (error.response) {
            console.error('Ошибка:', error.response.data);
            expect(error.response.status).toBe(400);
            expect(error.response.data).toHaveProperty('message');
        } else {
            console.error('Ошибка сети или другая ошибка:', error.message);
        }
    }
  });

  test('Создание пользователя успешно', async () => {
    const newUser = {
      userName: 'newUser',
      password: 'Password123!'
    };

    const response = await axios.post(`${BASE_URL}/User`, newUser, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    expect(response.status).toBe(200);
    userId = response.data.userID; // Сохраняем userID для дальнейшего использования
  });

test('Генерация токена с ошибкой', async ({ request }) => {

  const url = 'https://bookstore.demoqa.com/Account/v1/GenerateToken';

  const requestBody = {
    userName: "string",
    password: "string"
  };

  const response = await axios.post(url, {
    data: requestBody,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toEqual({
    token: null,
    expires: null,
    status: "Failed",
    result: "User authorization failed."
  });
});

  test('Генерация токена успешно', async () => {
    const validLogin = {
      userName: 'newUser',
      password: 'Password123!'
    };

    const response = await axios.post(`${BASE_URL}/GenerateToken`, validLogin);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });
});