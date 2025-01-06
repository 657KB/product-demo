import { useEffect, useMemo, useState } from 'react'
import queryString from 'query-string'
import { Product } from '../models/product'

export const useCategory = (products: Product[] | null = null) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    if (!Array.isArray(products)) return []
    const allCategories = products.reduce<string[]>((acc, cur) => acc.concat(cur.category), [])
    return ['All', ...Array.from(new Set(allCategories)).sort()]
  }, [products])

  useEffect(() => {
    const parsed = queryString.parse(location.search)
    setSelectedCategory(parsed.category as string || null)
  }, [products])

  const setProxy = (category: string | null) => {
    if (category === null) {
      history.replaceState(null, '', location.origin + location.pathname)
    } else {
      const parsed = queryString.parse(location.search)
      parsed.category = category
      history.replaceState(null, '', location.origin + location.pathname + '?' + queryString.stringify(parsed))
    }

    setSelectedCategory(category)
  }

  return { selectedCategory, setSelectedCategory: setProxy, categories }
}