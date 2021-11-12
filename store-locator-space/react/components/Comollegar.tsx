/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react'
import PropTypes from 'prop-types'
import { useCssHandles } from 'vtex.css-handles'
//import { isIntrospectionType } from 'graphql'
import { injectIntl } from 'react-intl'
const CSS_HANDLES = [
  'como_llegar_content',
  'como_llegar_link',
  'como_llegar_space'
] as const


const Comollegar: FC<any> = ({ latitude,longitude }) => {
  const handles = useCssHandles(CSS_HANDLES)
 
  const isMobile = () => {
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    )
    {
        return true;
    }

    return false;
   
}
const isIOS = () => {
    if( 
    navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    )
    {
        return true;
    }

    return false;
}




  return (

    (latitude && longitude && (
      <div className={`list ph3 mt0 ${handles.como_llegar_content}`}>
       
              <span className={`mt2 link c-link underline-hover pointer ${handles.como_llegar_link}`}
              >
                <a href={(isMobile() ? (isIOS() ? 'maps://maps.apple.com/?q=' : 'geo:'): 'http://maps.google.com.mx/maps?saddr=&daddr=')+latitude+','+longitude} className={`${handles.como_llegar_space}`} target="_blank">
               ¿Cómo llegar?
                </a>
                </span>
              
        
      </div>)
  )
  )
}

Comollegar.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number
}

export default injectIntl(Comollegar)
