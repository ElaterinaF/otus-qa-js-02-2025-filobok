interface ISBN {
    isbn: string;
  }
  
  interface BookData {
    collectionOfIsbns: ISBN[];
    [key: string]: any; 
  }
  
  const generateBookData = (overrides: Partial<BookData> = {}): BookData => {
    const defaultBookData: BookData = {
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
  
  const validBookData: BookData = generateBookData();
  const invalidBookData: BookData = generateBookData({ collectionOfIsbns: [{ isbn: '' }] });
  
  export {
    validBookData,
    invalidBookData,
    generateBookData
  };
  export type { BookData, ISBN };