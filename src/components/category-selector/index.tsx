import type { FC } from 'react'
import { motion } from 'motion/react'
import type { Product } from '../../models/product'
import { useCategory } from '../../hooks/use-category'
import { classNames } from '../../utils/classnames'

type CategorySelectorProps = {
  products?: Product[]
  onSelectedCategoryChange: (category: string | null) => void
}

const CategorySelector: FC<CategorySelectorProps> = ({ products, onSelectedCategoryChange }) => {
  const { categories, selectedCategory, setSelectedCategory } = useCategory(products)

  const selectCategory = (category: string) => {
    if (category === 'All') {
      setSelectedCategory(null)
      onSelectedCategoryChange(null)
    } else {
      setSelectedCategory(category)
      onSelectedCategoryChange(category)
    }
  }

  return (
    <div className='min-h-7'>
      {categories.map((category, i) => (
        <span
          key={category}
          className={classNames(
            'inline-block pr-4 text-lg text-black hover:cursor-pointer hover:opacity-100 transition-all select-none',
            (selectedCategory === category || (category === 'All' && selectedCategory === null))? 'opacity-80' : 'opacity-40',
          )}
          onClick={() => selectCategory(category)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: i * 0.06 } }}
          >
            {category}
          </motion.div>
        </span>
      ))}
    </div>
  )
}

export default CategorySelector
