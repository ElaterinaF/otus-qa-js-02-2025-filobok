import axios from 'axios';
import { describe, it, expect } from '@jest/globals';
import { UserGenerator } from '../../framework/services/user.helpers';

const BASE_URL = 'https://bookstore.demoqa.com/Account/v1/User';

describe('API Tests for User Creation and Token Generation', () => {
  
  it('Создание пользователя с ошибкой, логин уже используется', async () => {
    try {
      await axios.post(BASE_URL, {
        userName: "existingUser",
        password: "ValidPass1!"
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        expect(error.response?.status).toBe(406);
        expect(error.response?.data.code).toBe("1204");
        expect(error.response?.data.message).toContain("User exists!");
      }
    }
  });

  it('Создание пользователя с ошибкой, пароль не подходит', async () => {
    try {
      await axios.post(BASE_URL, {
        userName: "newUser",
        password: "short"
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        expect(error.response?.status).toBe(400);
        expect(error.response?.data.code).toBe("1300");
        expect(error.response?.data.message).toContain("Passwords must have at least one non alphanumeric character");
      }
    }
  });

  it('Создание пользователя успешно', async () => {
    const userName = UserGenerator.genName(); 
    const password = UserGenerator.genPassword();

    const response = await axios.post(BASE_URL, {
      userName,
      password
    });
    
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('userID'); 
    expect(response.data.username).toBe(userName); 
  });

  it('Генерация токена с ошибкой', async () => {
    try {
      await axios.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        userName: "nonExistentUser",
        password: "InvalidPass!"
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        expect(error.response?.status).toBe(400);
        expect(error.response?.data.code).toBe("1300");
        expect(error.response?.data.message).toContain("неверный логин или пароль");
      }
    }
  });

  it('Генерация токена успешно', async () => {
    const response = await axios.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      userName: "newUser123", 
      password: "ValidPass1!"
    });
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });
});