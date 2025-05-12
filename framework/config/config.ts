export interface Credentials {
  login?: string;
  password?: string;
  userId?: string;
  token?: string; 
}

export const credentials: Credentials = {
  login: process.env.TEST_BOOKSTORE_LOGIN,
  password: process.env.TEST_BOOKSTORE_PASSWORD,
  userId: process.env.TEST_BOOKSTORE_USER_ID
};

export const baseURL: string | undefined = process.env.TEST_BOOKSTORE_URL;