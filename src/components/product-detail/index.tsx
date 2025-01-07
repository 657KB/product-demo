import { type FC, type HTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { Product } from '../../models/product'
import { usePageScroll } from '../../hooks/use-page-scroll'
import { useDetail } from '../../hooks/use-detail'
import Loading from '../loading'

type ProductDetailProps = {
  product: Product | null
  onClose: () => void
} & HTMLAttributes<HTMLDivElement>

const ProductDetail: FC<ProductDetailProps> = ({ product, onClose }) => {
  const visible = product !== null
  const { productWithDes, isPending, error } = useDetail(product)

  usePageScroll(!visible)

  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: 'none' }}
      animate={visible ? { opacity: 1, pointerEvents: 'all' } : undefined}
      className='fixed left-0 right-0 top-0 bottom-0 select-none'
      style={{ background: 'rgba(0, 0, 0, .3)' }}
      onClick={() => onClose()}
    >
      <motion.div
        initial={{ transform: 'translate3d(100%, 0, 0)' }}
        animate={
          visible
            ? {
                transform: 'translate3d(0, 0, 0)',
                transition: { duration: 0.16, ease: 'easeOut' },
              }
            : undefined
        }
        className='fixed right-0 top-0 bottom-0 w-[50vw] bg-white dark:bg-zinc-800 shadow-lg space-y-6 flex flex-col'
        style={{ minWidth: 'min(100vw, 400px)' }}
        onClick={e => e.stopPropagation()}
      >
        {error && (
          <div className='w-full h-full flex items-center justify-center'>error</div>
        )}
        {isPending && (
          <div className='w-full h-full flex items-center justify-center'>
            <Loading />
          </div>
        )}
        {!isPending && !error && product !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              className='w-full h-[360px] overflow-hidden flex items-center justify-center'
            >
              <img className='w-full h-full object-cover' src={productWithDes.image} alt='product-img' />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateY: 4 }}
              animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3, delay: 0.08 } }}
              className='px-6 text-3xl font-semibold'
            >
              {productWithDes.title}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateY: 4 }}
              animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3, delay: 0.16 } }}
              className='px-6 text-sm space-x-4'
            >
              <span className='bg-gray-200 dark:bg-zinc-600 px-2 py-1 rounded'>{productWithDes.category}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateY: 4 }}
              animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3, delay: 0.24 } }}
              className='px-6 text-md'
            >
              {productWithDes.description}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.32 } }}
              className={`\
                mx-6 px-6 py-2 text-lg w-fit rounded-lg cursor-pointer \
                bg-zinc-900 dark:bg-slate-500 text-white hover:shadow-lg \
                transition-all duration-300 \
              `}
            >
              Buy ${productWithDes.price}
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default ProductDetail
