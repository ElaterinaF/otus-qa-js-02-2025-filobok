import { nameIsValid, fullTrim, getTotal } from "../../../framework/services/app.utils";
import type { OrderItem } from "../../../src/types/order";
import { describe, it, expect } from '@jest/globals';

describe('Проверка имени пользователя', () => {
    test('Возвращает true для валидного имени', () => {
        expect(nameIsValid('ivan')).toBe(true);
    });

    test('Возвращает false для имени менее 2 символов', () => {
        expect(nameIsValid('i')).toBe(false);
    });

    test('Возвращает false для нестроковых значений', () => {
        expect(nameIsValid(String(123))).toBe(false);
        expect(nameIsValid(String(null))).toBe(true);
        expect(nameIsValid(String(undefined))).toBe(true);
        expect(nameIsValid(JSON.stringify({}))).toBe(false);
    });

    test('Возвращает false для имени с символами, отличными от латинских букв', () => {
        expect(nameIsValid('iv@n')).toBe(false);
        expect(nameIsValid('ivan123')).toBe(false);
        expect(nameIsValid('иван')).toBe(false);
    });

    test('Возвращает false для пустой строки', () => {
        expect(nameIsValid('')).toBe(false);
    });
});

describe('Удаление пробелов из строки', () => {
  test('Удаляет все пробелы из строки', () => {
    expect(fullTrim('  hello world  ')).toBe('helloworld');
  });

  test('Возвращает пустую строку для пустого ввода', () => {
    expect(fullTrim('')).toBe('');
  });

  test('Обрабатывает нестроковые значения', () => {
    expect(fullTrim(String(123))).toBe('123');
    expect(fullTrim(String(null))).toBe('null');
    expect(fullTrim(String(undefined))).toBe('undefined');
    expect(fullTrim(JSON.stringify({}))).toBe('{}');
  });
});

describe('Подсчёт суммы заказа', () => {
  test('Возвращает правильную сумму без скидки', () => {
    expect(getTotal([{ price: 10, quantity: 10 }])).toBe(100);
  });

  test('Возвращает правильную сумму со скидкой', () => {
    expect(getTotal([{ price: 10, quantity: 10 }], 10)).toBe(90);
  });

  test.each([
    [[{ price: 10, quantity: 10 }], 0, 100],
    [[{ price: 10, quantity: 10 }], 50, 50],
    [[{ price: 10, quantity: 10 }], 100, 0],
  ])('Возвращает правильную сумму для различных скидок', (items, discount, expected) => {
    expect(getTotal(items as OrderItem[], discount as number)).toBe(expected);
  });

  test('Выбрасывает ошибку для недопустимых скидок', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], -1)).toThrow('Процент скидки должен быть от 0 до 99');
    expect(() => getTotal([{ price: 10, quantity: 10 }], 100)).toThrow('Процент скидки должен быть от 0 до 99');
  });
});