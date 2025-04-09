import axios from 'axios';
import { credentials, baseURL } from '../config/config';

const createBook = async (bookData) => {
    const response = await axios.post(`${baseURL}/Books`, bookData, {
        headers: {
            'Authorization': `Bearer ${credentials.token}` // Убедитесь, что токен получен и доступен
        }
    });
    return response.data;
};

const updateBook = async (bookData) => {
    const response = await axios.put(`${baseURL}/Books/${bookData.isbn}`, bookData, {
        headers: {
            'Authorization': `Bearer ${credentials.token}`
        }
    });
    return response.data;
};

const getBook = async (isbn) => {
    const response = await axios.get(`${baseURL}/Book?ISBN=${isbn}`, {
        headers: {
            'accept': 'application/json'
        }
    });
    return response.data;
};

const deleteBook = async (bookData) => {
    const response = await axios.delete(`${baseURL}/Book`, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: bookData // Передаем данные в теле запроса
    });
    return response.data;
};

export { createBook, updateBook, getBook, deleteBook };