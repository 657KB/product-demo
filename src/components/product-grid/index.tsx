import { useEffect, useState, type FC } from 'react'
import { motion } from 'motion/react'
import { Product } from '../../models/product'
import { classNames } from '../../utils/classnames'
import ProductCard from '../product-card'
import Loading from '../loading'

type ProductGridProps = {
  products?: Product[]
  isPending: boolean
  onClickProduct: (product: Product) => void
}

const ProductGrid: FC<ProductGridProps> = ({ products, isPending, onClickProduct }) => {
  const [cols, setCols] = useState(1)

  useEffect(() => {
    const updateCols = () => {
      if (window.screen.availWidth < 640) {
        setCols(1)
      } else if (window.screen.availWidth < 768) {
        setCols(2)
      } else if (window.screen.availWidth < 1024) {
        setCols(3)
      } else if (window.screen.availWidth < 1280) {
        setCols(4)
      } else if (window.screen.availWidth < 1536) {
        setCols(5)
      } else {
        setCols(6)
      }
    }
    updateCols()
    window.addEventListener('resize', updateCols)
    return () => window.removeEventListener('resize', updateCols)
  }, [])

  if (isPending) {
    return (
      <div className='flex items-center justify-center'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <motion.div
        className='text-lg mb-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
      >
        Total {products?.length || 0} products
      </motion.div>
      <div className={classNames(
        'grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
        'sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10'
      )}>
        {products?.map((product, i) => (
          <ProductCard
            key={`${product.id}`}
            product={product}
            delay={(i % cols) * 0.1}
            onClick={() => onClickProduct(product)}
          />
        ))}
      </div>
    </>
  )
}

export default ProductGrid
