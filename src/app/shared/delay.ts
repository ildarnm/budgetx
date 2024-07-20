export function delay<T>(
  callback: (
    resolve: (data: T) => void,
    reject: (error: string) => void,
  ) => void,
) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => callback(resolve, reject), 1000);
  });
}
