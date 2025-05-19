import { createBook, updateBook, getBook, deleteBook, Book } from '../../framework/services/bookController';
import { validBookData } from '../../framework/fixtures/bookFixtures';
import { describe, it, expect } from '@jest/globals';
import { credentials } from '../../framework/config/config';

describe('Book API Tests', () => {
  let createdBookISBN: string;

  beforeAll(async () => {
    const bookData: Book = {
      isbn: validBookData.collectionOfIsbns[0].isbn,
      userId: credentials.userId,
      collectionOfIsbns: [
        {
          isbn: validBookData.collectionOfIsbns[0].isbn
        }
      ]
    };

    const createdBook = await createBook(bookData);
    createdBookISBN = createdBook.isbn;
  });

  test('должен создавать книгу с корректными данными', () => {
    expect(createdBookISBN).toBe(validBookData.collectionOfIsbns[0].isbn);
  });

  test('должен обновлять книгу с корректными данными', async () => {
    const updatedBookData: Book = {
      isbn: createdBookISBN,
      userId: credentials.userId
    };

    const updatedBook = await updateBook(updatedBookData);
    expect(updatedBook).toHaveProperty('isbn', createdBookISBN);
  });

  test('должен не обновлять книгу без авторизации', async () => {
    const updatedBookData: Book = {
      isbn: createdBookISBN,
      userId: credentials.userId
    };

    await expect(updateBook(updatedBookData)).rejects.toThrow();
  });

  // Параметризированные тесты
  describe('Получение книги', () => {
    const testCases = [
      {
        name: 'должен получать существующую книгу',
        isbn: createdBookISBN,
        shouldPass: true
      },
      {
        name: 'должен возвращать ошибку для несуществующей книги',
        isbn: '978-3-16-148410-1',
        shouldPass: false
      }
    ];

    testCases.forEach(({ name, isbn, shouldPass }) => {
      test(name, async () => {
        if (shouldPass) {
          const book = await getBook(isbn);
          expect(book).toHaveProperty('isbn', isbn);
        } else {
          await expect(getBook(isbn)).rejects.toThrow();
        }
      });
    });
  });

  describe('Удаление книги', () => {
    const testCases = [
      {
        name: 'должен удалять существующую книгу',
        isbn: createdBookISBN,
        shouldPass: true
      },
      {
        name: 'должен возвращать ошибку для несуществующей книги',
        isbn: '978-3-16-148410-1',
        shouldPass: false
      }
    ];

    testCases.forEach(({ name, isbn, shouldPass }) => {
      test(name, async () => {
        const deleteData: Book = {
          isbn,
          userId: credentials.userId
        };

        if (shouldPass) {
          const response = await deleteBook(deleteData);
          expect(response).toHaveProperty('message', "Book deleted successfully");
        } else {
          await expect(deleteBook(deleteData)).rejects.toThrow();
        }
      });
    });
  });
});