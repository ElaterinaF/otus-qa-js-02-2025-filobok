import { createBook, updateBook, getBook, deleteBook } from '../framework/services/bookController';
import { validBookData, invalidBookData } from '../framework/fixtures/bookFixtures';
import { expect } from '@jest/globals';
import { credentials } from '../framework/config/config';

describe('Book API Tests', () => {
    let createdBookISBN;

    test('должен создавать книгу с корректными данными', async () => {
        const bookData = {
            userId: credentials.userId, // Используем userId из конфигурации
            collectionOfIsbns: [
                {
                    isbn: validBookData.collectionOfIsbns[0].isbn // используем ISBN из фикстуры
                }
            ]
        };

        const createdBook = await createBook(bookData);
        createdBookISBN = createdBook.collectionOfIsbns[0].isbn; // Сохраняем ISBN созданной книги
        expect(createdBook).toHaveProperty('isbn', bookData.collectionOfIsbns[0].isbn);
    });

    test('должен обновлять книгу с корректными данными', async () => {
        const updatedBookData = {
            userId: credentials.userId, // Используем userId из конфигурации
            isbn: createdBookISBN // используем ISBN созданной книги
        };

        const updatedBook = await updateBook(updatedBookData);
        expect(updatedBook).toHaveProperty('isbn', updatedBookData.isbn);
    });

    test('должен не обновлять книгу без авторизации', async () => {
        const updatedBookData = {
            userId: credentials.userId, // Используем userId из конфигурации
            isbn: createdBookISBN // используем ISBN созданной книги
        };

        await expect(updateBook(updatedBookData)).rejects.toThrow(); // Проверяем, что выбрасывается ошибка
    });

    // Параметризированный тест на получение книги
    const isbnList = [
        { isbn: createdBookISBN, expectedStatus: 200 }, // Ожидаем успешный ответ для созданной книги
        { isbn: '978-3-16-148410-1', expectedStatus: 400 } // Ожидаем ошибку для несуществующей книги
    ];

    isbnList.forEach(({ isbn, expectedStatus }) => {
        test(`должен получать книгу с ISBN: ${isbn}`, async () => {
            if (expectedStatus === 200) {
                const book = await getBook(isbn);
                expect(book).toHaveProperty('isbn', isbn);
            } else {
                await expect(getBook(isbn)).rejects.toThrow(); // Проверяем, что выбрасывается ошибка
            }
        });
    });

    // Параметризированный тест на удаление книги
    const deleteTestCases = [
        { isbn: createdBookISBN, expectedStatus: 204 }, // Ожидаем успешный ответ для удаленной книги
        { isbn: '978-3-16-148410-1', expectedStatus: 400 } // Ожидаем ошибку для несуществующей книги
    ];

    deleteTestCases.forEach(({ isbn, expectedStatus }) => {
        test(`должен ${expectedStatus === 204 ? 'удалить' : 'не удалить'} книгу с ISBN: ${isbn}`, async () => {
            const deleteData = {
                userId: credentials.userId, // Используем userId из конфигурации
                isbn: isbn
            };

            if (expectedStatus === 204) {
                const response = await deleteBook(deleteData);
                expect(response).toHaveProperty('message', "Book deleted successfully"); // Убедитесь, что сообщение соответствует вашему API
            } else {
                await expect(deleteBook(deleteData)).rejects.toThrow(); // Проверяем, что выбрасывается ошибка
            }
        });
    });
});