import { twMerge } from 'tailwind-merge'
import cn from 'classnames'

export const classNames = (...cls: cn.ArgumentArray) => {
  return twMerge(cn(cls))
}
