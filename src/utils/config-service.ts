class Config {
  static getString(name: string): string {
    const response = process.env[name];

    if (!response) {
      throw new Error('[Config] data not found');
    }
    
    return response;
  }

  static getNumber(name: string): number {
    const response = process.env[name];

    if (!response) {
      throw new Error('[Config] data not found');
    }
    
    return Number(response);
  }

}

export default Config;