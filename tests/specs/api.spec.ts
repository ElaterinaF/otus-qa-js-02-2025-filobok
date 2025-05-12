import axios, { AxiosError, AxiosResponse } from 'axios';

const BASE_URL = 'https://bookstore.demoqa.com/Account/v1/User';

interface User {
  userName: string;
  password: string;
}

interface UserResponse {
  userID: string;
  username: string;
}

interface TokenResponse {
  token: string | null;
  expires: string | null;
  status: string;
  result: string;
}

describe('API Tests for Bookstore', () => {
  let userId: string;

  test('Создание пользователя с ошибкой, пароль не подходит', async () => {
    const newUser: User = {
      userName: 'newUser',
      password: 'short'
    };

    try {
      await axios.post(`${BASE_URL}/User`, newUser, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      fail('Запрос должен был завершиться с ошибкой');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response) {
          console.error('Ошибка:', axiosError.response.data);
          expect(axiosError.response.status).toBe(400);
          expect(axiosError.response.data).toHaveProperty('message');
        }
      } else if (error instanceof Error) {
        console.error('Ошибка сети или другая ошибка:', error.message);
      }
    }
  });

  test('Создание пользователя успешно', async () => {
    const newUser: User = {
      userName: 'newUser',
      password: 'Password123!'
    };

    const response: AxiosResponse<UserResponse> = await axios.post(`${BASE_URL}/User`, newUser, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    expect(response.status).toBe(201); // Обычно 201 для создания ресурса
    userId = response.data.userID;
  });

  test('Генерация токена с ошибкой', async () => {
    const url = 'https://bookstore.demoqa.com/Account/v1/GenerateToken';

    const requestBody: User = {
      userName: "string",
      password: "string"
    };

    const response: AxiosResponse<TokenResponse> = await axios.post(url, requestBody, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      token: null,
      expires: null,
      status: "Failed",
      result: "User authorization failed."
    });
  });

  test('Генерация токена успешно', async () => {
    const validLogin: User = {
      userName: 'newUser',
      password: 'Password123!'
    };

    const response: AxiosResponse<TokenResponse> = await axios.post(`${BASE_URL}/GenerateToken`, validLogin, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    expect(response.status).toBe(200);
    expect(response.data.token).toBeTruthy();
    expect(response.data.status).toBe("Success");
  });
});