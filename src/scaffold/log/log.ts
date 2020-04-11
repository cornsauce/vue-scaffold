export class Log {
  public static d(...args: any[]): void {
    console.debug(...args);
  }

  public static l(...args: any[]): void {
    console.log(...args);
  }

  public static w(...args: any[]): void {
    console.warn(...args);
  }

  public static e(...args: any[]): void {
    console.error(...args);
  }
}
