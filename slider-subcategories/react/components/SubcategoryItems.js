import React from 'react'
// import LinkRouter from './LinkRouter'
// import { usePixel } from 'vtex.pixel-manager/PixelContext'
import { useCssHandles} from 'vtex.css-handles'; 

const CSS_HANDLES = ["fit_name"];

const SubcategoryItems = ({
    name,
    img,
    className,
    url,
    page,
    parameters,
    // typeOfRoute,
}) => {

    const handles = useCssHandles(CSS_HANDLES)
    // const { push } = usePixel()

    // const pushClickEvent = (event, eventName) => {
    //     console.log('event: ', event);

    //     window.performance.mark('load-page-category-start');

    //     switch (eventName) {
    //         case 'categorySliderClickVitor':
    //             {
    //                 push({
    //                     event: 'categorySliderClickVitor',
    //                     category: 'Home',
    //                     action: 'Carrossel Categorias',
    //                     label: event.target.title,
    //                 })
    //             }
    //             break
    //     }
    // }

    // console.log('url: ', url)

    return (
        // <LinkRouter to = { url }
        //     parameters = { parameters }
        //     // typeOfRoute = { typeOfRoute }
        //     title = { name }
        //     style = {
        //         { width: '30px' }
        //     }
        //     className = { `category-item_container ${className}` }
        //     onClick = {
        //         () =>
        //         pushClickEvent(event, 'categorySliderClickVitor')
        //     } >
        //     <div title = { name }
        //         className = "img_wrapper" >
        //         <img title = { name }
        //             src = { img } />
        //     </div>
        //     <div title = { name }
        //         className = "category_text_container" >
        //         <h4 title = { name }
        //             className = "name" >
        //             { name }
        //         </h4>
        //     </div>
        // </LinkRouter>
        <a
            // {...(dangerouslySetInnerHTML && {
            //     dangerouslySetInnerHTML: dangerouslySetInnerHTML,
            // })}
            href={url}
            // id={id}
            className={className}
            // title={title}
            // target={target}
        >
            <div title = { name }
                className = "" >
                <img title = { name }
                    src = { img }  />
            </div>
            <div title = { name }
                className = "category_text_container" >
                <h4 title = { name }
                    className={`${handles.fit_name}`} >
                    { name }
                </h4>
            </div>
        </a>
    )
}

export default SubcategoryItems