import { useQuery } from '@tanstack/react-query'
import type { Product } from '../models/product'
import { fetchProductDetail } from '../services/product'

export const useDetail = (product: Product | null) => {
  const { /* error,*/ data, isPending } = useQuery({
    queryKey: ['detail', `product-${product?.id}-detail`],
    queryFn: () => {
      return product === null ? { description: '' } : fetchProductDetail(product.id)
    },
  })

  return { productWithDes: { ...product, ...data }, isPending }
}
