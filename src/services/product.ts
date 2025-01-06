import { faker } from '@faker-js/faker'
import { randomInt } from '../utils/random'
import { Product } from '../models/product'

// const HOST = 'https://fakestoreapi.com'

// const baseFetch = (api: string, init?: RequestInit) => {
//   return fetch(`${HOST}${api}`, init)
// }

const categories = ['Electronics', 'Fashion & Apparel', 'Home & Kitchen', 'Sports & Outdoors', 'Health & Personal Care', 'Toys & Games', 'Automotive', 'Books & Media', 'Beauty & Skincare', 'Office Supplies']

export const fetchProducts = () => {
  // return baseFetch(`/products`)
  console.debug(`fetch product`)
  const mockData = Array.from({ length: 64 }).map((_, i) => ({
    id: `${i}`,
    title: `Product_${faker.string.alpha(6)}`,
    image: `/images/${i % 6 + 1}.avif`,
    category: Array.from(new Set(Array.from({ length: randomInt(4, 1) }).map(() => categories[randomInt(9)]))),
    price: randomInt(1000, 100),
  }))
  return new Promise<Product[]>(resolve => {
    setTimeout(() => resolve(mockData), randomInt(1200, 300))
  })
}

export const fetchProductDetail = (id: string) => {
  // return baseFetch(`/products/${id}`)
  console.debug(`fetch product detail [${id}]`)
  return new Promise<{ description: string }>(resolve => {
    setTimeout(
      () => resolve({ description: 'Our product combines modern technology with user demands, designed to enhance everyday experiences. It features innovative functionality and versatile adaptability, optimized for various scenarios and personal preferences. Whether for work, entertainment, or daily life, this product delivers unexpected convenience and enjoyment. Choose it to embark on a journey of endless possibilities.' }),
      randomInt(1200, 300),
    )
  })
}
