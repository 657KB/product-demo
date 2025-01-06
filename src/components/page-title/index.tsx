import { motion } from 'motion/react'

const PageTitle = ({ isPending }: { isPending: boolean }) => {
  return (
    <div className='text-8xl mb-4 font-semibold overflow-hidden'>
      <motion.h1
        initial={{ transform: 'translate3d(0, 100%, 0)' }}
        animate={{
          transform: isPending ? 'translate3d(0, 100%, 0)' : 'translate3d(0, 0, 0)',
          transition: { duration: 0.24, easings: [0.215, 0.61, 0.355, 1] },
        }}
      >
        PRODUCT DEMO
      </motion.h1>
    </div>
  )
}

export default PageTitle
