import type { FC } from 'react'
import { motion } from 'motion/react'
import { Product } from '../../models/product'

type ProductCard = {
  product: Product
  delay: number
} & React.HTMLAttributes<HTMLDivElement>

const ProductCard: FC<ProductCard> = ({ product, delay, onClick }) => {
  const { image, title, price } = product

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.3, delay } }}
      layoutId={`${product.id}${product.title}`}
      className='group flex flex-col cursor-pointer hover:brightness-110'
      onClick={onClick}
    >
      <div className='relative overflow-hidden mb-2 h-0 flex-1'>
        <img
          className='group-hover:scale-110 transition-all w-full h-full object-cover duration-300'
          src={image}
          alt='product image'
        />
        <motion.div
          initial={{ transform: 'translate3d(0, 0, 0)' }}
          whileInView={{
            transform: 'translate3d(0, -100%, 0)',
            transition: { duration: 0.3, delay, easings: [0, 0.55, 0.45, 1] },
          }}
          viewport={{ once: true }}
          className='absolute top-0 left-0 right-0 bottom-0 bg-white'
        />
      </div>
      <div className='flex text-lg'>
        <div>{title}</div>
        <div className='flex-1 text-end'>${price}</div>
      </div>
    </motion.div>
  )
}

export default ProductCard
