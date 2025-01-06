import { useState } from 'react'
import { Product } from '../models/product'
import { useRestore } from './use-restore'

export const useSelectProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const saveState = useRestore<Product>('selected-product', restoreSelectedProduct => {
    setSelectedProduct(restoreSelectedProduct)
  })

  const setSelectedProductProxy = (product: Product | null) => {
    saveState(product)
    setSelectedProduct(product)
  }

  return { selectedProduct, setSelectedProduct: setSelectedProductProxy }
}
