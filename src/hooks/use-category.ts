import { useEffect, useMemo, useState } from 'react'
import { Product } from '../models/product'

export const useCategory = (products: Product[] | null = null) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    if (!Array.isArray(products)) return []
    const allCategories = products.reduce<string[]>((acc, cur) => acc.concat(cur.category), [])
    return ['All', ...Array.from(new Set(allCategories)).sort()]
  }, [products])

  useEffect(() => setSelectedCategory(null), [products])

  return { selectedCategory, setSelectedCategory, categories }
}