export class UserGenerator {
    static genId() {
      return Math.floor(Math.random() * 1000000); // Генерация случайного идентификатора
    }
  
    static genName(postfix) {
      return 'Autotest_' + (postfix ? postfix + '_' : '') + this.genId().toString(16);
    }
  
    static genPassword() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      let password = '';
      for (let i = 0; i < 12; i++) { // Длина пароля 12 символов
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }
      return password;
    }
  }