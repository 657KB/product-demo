import { useEffect } from 'react'

export const usePageScroll = (enable: boolean) => {
  useEffect(() => {
    document.body.style.overflowY = enable ? 'auto' : 'hidden'
    document.body.style.paddingRight = enable ? '0' : '6px'
  }, [enable])
}
