import { useMemo } from 'react'
import { Product } from '../models/product'

export const useProducts = (products: Product[] = [], category: string | null) => {
  const visibleProducts = useMemo(() => {
    if (category === null) {
      return products
    }
    return products.filter(product => product.category === category)
  }, [category, products])

  return { visibleProducts }
}
