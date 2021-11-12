import React, { memo, FC, ReactNode } from 'react'
import { IconCaret } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'

import { useSliderState } from './SliderContextSubcategory'
import useKeyboardArrows from '../hooks/useKeyboardArrowsSubcategory'
import { useSliderControls } from '../hooks/useSliderControlsSubcategory'

interface Props {
  custom?: ReactNode
  orientation: 'left' | 'right'
  controls: string
  totalItems: number
  infinite: boolean
  arrowSize: number
}

const CSS_HANDLES = ['sliderLeftArrow', 'sliderRightArrow', 'sliderArrows']

const ArrowSubcategory: FC<Props> = ({
  custom,
  orientation,
  controls,
  totalItems,
  infinite,
  arrowSize,
}) => {
  const { currentSlide, slidesPerPage, navigationStep } = useSliderState()
  const { goBack, goForward } = useSliderControls(infinite)

  const handles = useCssHandles(CSS_HANDLES)

  const isLeftEndReach = !(currentSlide - (navigationStep || 1) >= 0)
  const isRightEndReach = !(currentSlide + 1 + slidesPerPage <= totalItems)
  const disabled =
    !infinite &&
    ((orientation === 'left' && isLeftEndReach) ||
      (orientation === 'right' && isRightEndReach))

  useKeyboardArrows(goBack, goForward)

  function handleArrowClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (event) {
      event.stopPropagation()
      event.preventDefault()
    }

    if (orientation === 'left') {
      goBack()
    }

    if (orientation === 'right') {
      goForward()
    }
  }

  return (
    <button
      className={`${
        orientation === 'left'
          ? `${handles.sliderLeftArrow} left-0`
          : `${handles.sliderRightArrow} right-0`
      } ${
        handles.sliderArrows
      } absolute transparent ma2 flex items-center justify-center bn outline-0 pointer`}
      style={{ background: 'transparent' }}
      onClick={handleArrowClick}
      aria-controls={controls}
      aria-label={`${orientation === 'left' ? 'Previous' : 'Next'} Slide`}
      disabled={disabled}
    >
      {custom ?? <IconCaret size={arrowSize} orientation={orientation} thin />}
    </button>
  )
}

export default memo(ArrowSubcategory)
