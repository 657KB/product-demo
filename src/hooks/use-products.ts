import { useMemo } from 'react'
import { Product } from '../models/product'

export const useProducts = (products: Product[] = [], category: string | null) => {
  const visibleProducts = useMemo(() => {
    if (category === null) {
      return products
    }
    return products.filter(product => product.category.indexOf(category) !== -1)
  }, [category, products])

  return { visibleProducts }
}
