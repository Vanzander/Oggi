import React, { useEffect } from 'react'
import Slider from 'react-slick'
import SubcategoryItems from './SubcategoryItems'
import { NoSSR } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager/PixelContext'
import { IconCaret } from "vtex.store-icons";
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'

import './global.css'

// const GLOBAL_PAGES = global.__RUNTIME__ && [
//     'Internal URL',
//     ...Object.keys(global.__RUNTIME__.pages),
// ]

function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return ( <
        div className = { className }
        style = {
            {...style }
        }
        onClick = { onClick } >
        <
        span key = { `caret-next-desktop` }
        className = { `swiper-caret-next pl7 pr2 right-0` } >

        <
        IconCaret orientation = "right"
        size = "18"
        className = "carouselIconCaret" /
        >
        <
        /span> < /
        div >
    )
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return ( <
        div className = { className }
        style = {
            {
                ...style,
            }
        }
        onClick = { onClick } >

        <
        span key = { `caret-prev-desktop` }
        className = { `swiper-caret-prev pr7 pl2 left-0` } >

        <
        IconCaret orientation = "left"
        size = "18"
        className = "carouselIconCaret" /
        >
        <
        /span> < /
        div >
    )
}

const SubcategorySlider = props => {
        const { staticUrl } = props
        console.log('staticUrl: ', staticUrl)

        const {
            // searchQuery,
            // map,
            params,
            // priceRange,
            // hiddenFacets,
            filters,
            // showFacets,
            // preventRouteChange,
            // facetsLoading,
        } = useSearchPage()

         //</span>console.log('params: ', params)
        const gender = params.department
        console.log('gender: ', gender);

        if (!gender) {
            return ( < div > < /div>)
            }

            const facets = filters.filter(filter => {
                console.log('filter: ', filter);
                const title = filter.title
                if (title === 'Fit') {
                    return true;
                } else {
                    return false;
                }
            })
            console.log('facets: ', facets);



            let categories = [];



            facets.forEach(facet => {
                categories = facet.facets
                    // return facet.facets
            })

            // console.log('o0o: ');
            //console.log('categories: ', categories);
            //console.log(':)');
            categories.forEach(category => {
                category.img = `/arquivos/${gender}-${category.value}.jpg`
                category.url = `/${gender}/jeans/${category.value}?map=departamento,categoria,fit`
            })

            const { push } = usePixel()
            let randomCategories = categories

            console.log('categories: ', categories);
            console.log('NoSSR: ', NoSSR);

            const shuffle = () => {
                for (let i = randomCategories.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * i)
                    const temp = randomCategories[i]
                    randomCategories[i] = randomCategories[j]
                    randomCategories[j] = temp
                }
                return randomCategories
            }

            useEffect(() => {
                shuffle()
            }, [])

            const settings = {
                arrows: true,
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 6,
                slidesToScroll: 6,
                lazyLoad: true,
                nextArrow: < SampleNextArrow / > ,
                prevArrow: < SamplePrevArrow / > ,
                beforeChange: (current, next) => {
                    setTimeout(() => {
                        push({
                            event: 'categorySliderPrevNextClickVitor',
                            category: 'Home',
                            action: 'Carrossel Categorias',
                            label: 'Prev/Next',
                        })
                    }, 500)
                },
                responsive: [{
                        breakpoint: 1700,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            infinite: false,
                            dots: false,
                        },
                    },
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            infinite: false,
                            dots: false,
                        },
                    },
                 
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: false,
                            arrows: true,
                            dots: false,
                        },
                    },
                ],
            }

            const renderSSR = () => {
                console.log('randomCategories: ', randomCategories);
                return ( <
                    div className = "categories-footer-scroll categories-footer-scroll-ssr" > {
                        randomCategories &&
                        randomCategories.map((category, index) => {
                            if (index < 6) {
                                return ( <
                                    SubcategoryItems {...category }
                                    key = { index }
                                    />
                                )
                            }

                            return null
                        })
                    } <
                    /div>
                )
            }

            const classConteiner = () => {

                
                if (randomCategories.length > 0){
                    return 'vitrine-categoria';
                }
                return 'caroucel_hidden';
                
            }

            return ( <
                section id = {classConteiner()} >
                <
                div className = "container" > {
                    /* <h2 className = "sub-title text-center" >
                                        { title }
                                    </h2> */
                } <
                NoSSR onSSR = { renderSSR() } >
                <
                Slider className = "categories-footer-scroll" {...settings } > {
                    categories &&
                    categories.map((category, index) => ( <
                        SubcategoryItems {...category }
                        key = { index }
                        />
                    ))
                } <
                /Slider> < /
                NoSSR > <
                /div> < /
                section >
            )
        }

        SubcategorySlider.uiSchema = {
            categories: {
                items: {
                    img: {
                        'ui:widget': 'image-uploader',
                    },
                },
            },
        }

        SubcategorySlider.defaultProps = {
            staticUrl: './assets/',
        }

        SubcategorySlider.getSchema = () => {
            // const internalRouteSchema = {
            //     customInternalURL: {
            //         description: 'admin/editor.carousel.bannerLink.custominternalurl.description',
            //         isLayout: false,
            //         title: 'admin/editor.carousel.bannerLink.custominternalurl.title',
            //         type: 'string',
            //     },
            //     page: {
            //         // enum: GLOBAL_PAGES,
            //         isLayout: false,
            //         title: 'admin/editor.carousel.bannerLink.page.title',
            //         type: 'string',
            //     },
            //     params: {
            //         description: 'admin/editor.carousel.bannerLink.params.description',
            //         isLayout: false,
            //         title: 'admin/editor.carousel.bannerLink.params.title',
            //         type: 'string',
            //     },
            // }

            // const externalRouteSchema = {
            //     url: {
            //         isLayout: false,
            //         title: 'admin/editor.carousel.bannerLink.url.title',
            //         type: 'string',
            //     },
            // }
            return {
                title: 'Slider de Subcategorias',
                description: 'Slider de Subcategorias',
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        title: 'Texto Principal',
                        default: SubcategorySlider.defaultProps.title,
                    },
                    categories: {
                        type: 'array',
                        title: 'Subcategorias',
                        default: SubcategorySlider.defaultProps.categories,
                        items: {
                            type: 'object',
                            title: 'Subcategoria',
                            properties: {
                                name: {
                                    type: 'string',
                                    title: 'Nombre de Subcategoria',
                                },
                                className: {
                                    type: 'string',
                                    title: 'ClassName de elemento',
                                },
                                img: {
                                    type: 'string',
                                    title: 'Imagen',
                                },
                                // ...internalRouteSchema,
                                // ...externalRouteSchema,
                            },
                        },
                    },
                },
            }
        }

        export default SubcategorySlider