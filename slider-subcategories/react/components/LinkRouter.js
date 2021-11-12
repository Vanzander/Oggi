import React, { Component } from 'react'
// import { Link } from 'vtex.render-runtime'

class LinkRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // getParams(params) {
    //     const json = {}

    //     //if is a empty string just return empty object
    //     if (typeof params === 'string' && !params.length > 0) {
    //         return json
    //     }

    //     if (params && typeof params === 'string') {
    //         const array = params.split(',')

    //         array.forEach(item => {
    //             const pair = item.split('=')
    //             json[pair[0]] = pair[1]
    //         })

    //         return json
    //     }

    //     return params
    // }

    render() {
        const {
            // page,
            // parameters,
            // typeOfRoute,
            id,
            className,
            children,
            // scrollOptions,
            title,
            target,
            // onClick,
            // query,
            // dangerouslySetInnerHTML,
            to,
        } = this.props

        // console.log('page: ', page);
        console.log('this.props: ', this.props);
        // console.log('dangerouslySetInnerHTML: ', dangerouslySetInnerHTML);
        console.log('to: ', to);

        return (
            <a
                // {...(dangerouslySetInnerHTML && {
                //     dangerouslySetInnerHTML: dangerouslySetInnerHTML,
                // })}
                href={to}
                id={id}
                className={className}
                title={title}
                target={target}
            >
                {children && children}
            </a>
        )
    }
}

LinkRouter.propTypes = {
    /** Type of route */
    typeOfRoute: PropTypes.string,
    /** Children */
    children: PropTypes.node,
}

LinkRouter.defaultProps = {
    typeOfRoute: 'internal',
    target: '_self',
}

export default LinkRouter
