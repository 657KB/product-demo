export const randomInt = (max: number, min = 0) => {
  return Math.max(min, Math.floor(Math.random() * (max + 1)))
}