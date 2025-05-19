/**
 * Проверка имени пользователя
 * @param {string} name
 * @returns {boolean}
 */
export const nameIsValid = (name: string) => typeof name === 'string' && name.length >= 2 && /^[a-z]+$/.test(name)

/**
 * Удаление пробелов из строки
 *
 * @param {string} text
 * @returns {string}
 */
export const fullTrim = (text: string) => (text ?? '').replace(/\s+/g, '')

/**
 * Подсчёт суммы заказа
 *
 * @param {[{quantity: number, name?: string, price: number}]} items
 * @param {number} discount
 * @returns {number}
 * @throws Вернёт ошибку, если скидка не число и больше 99 или меньше 0
 * @example getTotal([{ price: 10, quantity: 10 }]) // 100
 * @example getTotal([{ price: 10, quantity: 1 }]) // 10
 * @example getTotal([{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }]) // 100
 * @example getTotal([{ price: 10, quantity: 0 }], { price: 10, quantity: 9 }) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 10) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 100) // 0
 */
type Item = {
  price: number;
  quantity: number;
};

export const getTotal = (items: Item[] = [], discount: any = 0): number => {
  if (typeof discount !== 'number') {
    throw new Error('Скидка должна быть числом');
  }
  if (discount < 0 || discount >= 100) {
    throw new Error('Процент скидки должен быть от 0 до 99');
  }

  const total = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
  return total * (1 - discount / 100);
};

/**
 * Функция getScore принимает объект с никами и успеваемостью и возвращает сумму всех баллов.
 * @param {Object} scores - Объект, где ключи - это ники, а значения - успеваемость.
 * @returns {number} Сумма всех баллов.
 */
// function getScore(scores: Record<string, number>): number {
//   let totalScore = 0;
//   for (let nick in scores) {
//     totalScore += scores[nick];
//   }
//   return totalScore;
// }

// const scores = {
//   Anna: 10,
//   Olga: 1,
//   Ivan: 5,
// };

// console.log(getScore(scores));