export default async function delay(callback: () => void, amount: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, amount)
  })
}
