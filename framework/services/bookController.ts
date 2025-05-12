import axios from 'axios';
import { credentials, baseURL } from '../config/config';

export interface Book {
  isbn: string;
  userId?: string;
  collectionOfIsbns?: Array<{ isbn: string }>;
  [key: string]: any;
}

const createBook = async (bookData: Book) => {
  if (!baseURL) throw new Error('Base URL is not defined');
  if (!credentials.token) throw new Error('Token is not available');

  const response = await axios.post(`${baseURL}/Books`, bookData, {
    headers: {
      'Authorization': `Bearer ${credentials.token}`
    }
  });
  return response.data;
};

const updateBook = async (bookData: Book) => {
  if (!baseURL) throw new Error('Base URL is not defined');
  if (!credentials.token) throw new Error('Token is not available');

  const response = await axios.put(`${baseURL}/Books/${bookData.isbn}`, bookData, {
    headers: {
      'Authorization': `Bearer ${credentials.token}`
    }
  });
  return response.data;
};

const getBook = async (isbn: string) => {
  if (!baseURL) throw new Error('Base URL is not defined');

  const response = await axios.get(`${baseURL}/Book?ISBN=${isbn}`, {
    headers: {
      'accept': 'application/json'
    }
  });
  return response.data;
};

const deleteBook = async (bookData: Book) => {
  if (!baseURL) throw new Error('Base URL is not defined');

  const response = await axios.delete(`${baseURL}/Book`, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: bookData
  });
  return response.data;
};

export { createBook, updateBook, getBook, deleteBook };