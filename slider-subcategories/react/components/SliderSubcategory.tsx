import React, { FC, useRef, Fragment, ReactNode } from 'react'
import { useDevice } from 'vtex.device-detector'
import { useCssHandles } from 'vtex.css-handles'

import { useScreenResize } from '../hooks/useScreenResizeSubcategory'
import { useTouchHandlers } from '../hooks/useTouchHandlersSubcategory'
import { useAutoplay } from '../hooks/useAutoplaySubcategory'
import { useSliderState } from './SliderContextSubcategory'
import SliderTrackSubcategory from './SliderTrackSubcategory'
import ArrowSubcategory from './ArrowSubcategory'
import PaginationDotsSubcategory from './PaginationDotsSubcategory'

interface Props extends SliderSubcategoriesSiteEditorProps {
  totalItems: number
  itemsPerPage: number
  centerMode: SliderSubcategoriesProps['centerMode']
  // This type comes from React itself. It is the return type for
  // React.Children.toArray().
  children?: Array<Exclude<ReactNode, boolean | null | undefined>>
}

const CSS_HANDLES = ['sliderLayoutContainer', 'sliderTrackContainer'] as const

const SliderSubcategory: FC<Props> = ({
  children,
  totalItems,
  infinite = false,
  showNavigationArrows,
  showPaginationDots,
  usePagination: shouldUsePagination = true,
  arrowSize,
  fullWidth,
  itemsPerPage,
  centerMode,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  const { label = 'slider', slidesPerPage } = useSliderState()
  const containerRef = useRef<HTMLDivElement>(null)
  const { onTouchEnd, onTouchStart, onTouchMove } = useTouchHandlers({
    infinite,
    centerMode,
  })

  // console.log('childrenSub: ', children);

  useAutoplay(infinite, containerRef)
  useScreenResize(infinite, itemsPerPage)

  const shouldBeStaticList = slidesPerPage >= totalItems

  const controls = `${label
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')}-items`

  const shouldShowArrows = Boolean(
    (showNavigationArrows === 'always' ||
      (showNavigationArrows === 'mobileOnly' && isMobile) ||
      (showNavigationArrows === 'desktopOnly' && !isMobile)) &&
      !shouldBeStaticList
  )

  const shouldShowPaginationDots = Boolean(
    (showPaginationDots === 'always' ||
      (showPaginationDots === 'mobileOnly' && isMobile) ||
      (showPaginationDots === 'desktopOnly' && !isMobile)) &&
      !shouldBeStaticList
  )

  const touchStartHandler = (e: React.TouchEvent) =>
    shouldUsePagination && !shouldBeStaticList ? onTouchStart(e) : null

  const touchEndHandler = (e: React.TouchEvent) =>
    shouldUsePagination && !shouldBeStaticList ? onTouchEnd(e) : null

  const touchMoveHandler = (e: React.TouchEvent) =>
    shouldUsePagination && !shouldBeStaticList ? onTouchMove(e) : null

  return (
    <section
      onTouchStart={touchStartHandler}
      onTouchEnd={touchEndHandler}
      onTouchMove={touchMoveHandler}
      aria-label={label}
      style={{
        WebkitOverflowScrolling: !shouldUsePagination ? 'touch' : undefined,
        paddingLeft: fullWidth ? undefined : arrowSize * 2,
        paddingRight: fullWidth ? undefined : arrowSize * 2,
      }}
      className={`w-100 flex items-center relative ${handles.sliderLayoutContainer}`}
    >
      <div
        className={`w-100 ${handles.sliderTrackContainer} ${
          shouldUsePagination ? 'overflow-hidden' : 'overflow-x-scroll'
        }`}
        ref={containerRef}
      >
        <SliderTrackSubcategory
          centerMode={centerMode}
          infinite={infinite}
          totalItems={totalItems}
          usePagination={shouldUsePagination}
        >
          {children}
        </SliderTrackSubcategory>
      </div>
      {shouldShowArrows && shouldUsePagination && (
        <Fragment>
          <ArrowSubcategory
            totalItems={totalItems}
            orientation="left"
            controls={controls}
            infinite={infinite}
            arrowSize={arrowSize}
          />
          <ArrowSubcategory
            totalItems={totalItems}
            orientation="right"
            controls={controls}
            infinite={infinite}
            arrowSize={arrowSize}
          />
        </Fragment>
      )}
      {shouldShowPaginationDots && shouldUsePagination && (
        <PaginationDotsSubcategory
          totalItems={totalItems}
          controls={controls}
          infinite={infinite}
        />
      )}
    </section>
  )
}

export default SliderSubcategory
