import { useEffect } from 'react'

import { useSliderState } from '../components/SliderContextSubcategory'
import { useSliderControls } from './useSliderControlsSubcategory'
import useHovering from './useHoveringSubcategory'

export const useAutoplay = (
  infinite: boolean,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const { autoplay } = useSliderState()
  const { isHovering } = useHovering(containerRef)

  const shouldStop = autoplay?.stopOnHover && isHovering

  const { goForward } = useSliderControls(infinite)

  useEffect(() => {
    if (!autoplay) {
      return
    }

    const timeout = setTimeout(() => {
      goForward()
    }, autoplay.timeout)

    shouldStop && clearTimeout(timeout)

    return () => clearTimeout(timeout)
  }, [goForward, shouldStop, autoplay])
}
