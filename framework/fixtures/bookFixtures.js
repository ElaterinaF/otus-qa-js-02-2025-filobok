const generateBookData = (overrides = {}) => {
    const defaultBookData = {
        collectionOfIsbns: [
            {
                isbn: "978-3-16-148410-0" // пример корректного ISBN
            }
        ]
    };

    return {
        ...defaultBookData,
        ...overrides
    };
};

const validBookData = generateBookData();
const invalidBookData = generateBookData({ collectionOfIsbns: [{ isbn: '' }] }); // Пример некорректных данных

export default {
    validBookData,
    invalidBookData,
    generateBookData
};


