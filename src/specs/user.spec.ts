export class UserGenerator {

  static genId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  static genName(postfix?: string): string {
    return 'Autotest_' + (postfix ? postfix + '_' : '') + this.genId().toString(16);
  }

  static genPassword(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }
}