import { useEffect, useState } from 'react'
import { Product } from '../models/product'

export const useProducts = (products: Product[] = []) => {
  const [visibleProducts, setVisibleProducts] = useState(products)

  const filterProducts = (category: string | null) => {
    if (category === null) {
      setVisibleProducts(products)
    } else {
      const filtered = products.filter(product => product.category.indexOf(category) !== -1)
      setVisibleProducts(filtered)
    }
  }

  useEffect(() => setVisibleProducts(products), [products])

  return { visibleProducts, filterProducts }
}
