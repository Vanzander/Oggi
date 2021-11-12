/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { graphql, compose, useLazyQuery } from 'react-apollo'
import { Spinner,Collapsible } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import ORDER_FORM from './queries/orderForm.gql'
import GET_STORES from './queries/getStores.gql'
import GOOGLE_KEYS from './queries/GetGoogleMapsKey.graphql'
import Listing from './components/Listing'
import Pinpoints from './components/Pinpoints'

const CSS_HANDLES = [
  'container',
  'storesListCol',
  'storesList',
  'storesMapCol',
  'noResults',
  'listingMapContainer',
  'loadAll',
  'content_filter',
  'filter_municipio',
  'filter_estado',
  'filter_input_content',
  'filter_input',
  'filter_button',
  'filter_lista',
  'mun_space',
  'des_space'
] as const

const StoreList = ({
  orderForm: { called: ofCalled, loading: ofLoading, orderForm: ofData },
  googleMapsKeys,
  filterByTag,
  icon,
  iconWidth,
  iconHeight,
}) => {

  
  const [getStores, { data, loading, called, error }] = useLazyQuery(
    GET_STORES,
    {
      fetchPolicy: 'cache-first',
    }
  )
  let [filter, setFilter] = useState('')
  let [municipiosFilter, setMunicipiosFilter] = useState(Array)
  let [estadosFilter, setEstadosFilter] = useState(Array)
  let [isOpenMunicipio, setIsOpenMunicipio] = useState(false)
  let [isOpenEstado, setIsOpenEstado] = useState(false)
  const [state, setState] = useState({
    allLoaded: false,
    center: null,
    zoom: 10,
  })

  const handles = useCssHandles(CSS_HANDLES)

  const loadAll = () => {

    filterByTag = filter;
    setState({
      ...state,
      allLoaded: true,
    })
    getStores({
      variables: {
        latitude: null,
        longitude: null,
        filterByTag,
      },
    })
  }

  if (ofCalled && !ofLoading && !called) {
    if (
      ofData.shippingData?.address?.postalCode &&
      ofData.shippingData.address.postalCode.indexOf('*') === -1
    ) {
      const [longitude, latitude] = ofData.shippingData.address.geoCoordinates
   
      getStores({
        variables: {
          latitude,
          longitude,
          filterByTag,
        },
      })
    } else {
      loadAll()
    }
  }

  if (!loading && called && error && !state.allLoaded) {
    loadAll()
 
   
  }

  const handleCenter = (center: any, zoom: number) => {
    setState({
      ...state,
      center,
      zoom,
    })
  }

  if (called) {
/*    
    if (!loading && !!data && data.getStores.items.length === 0) {
      loadAll()
    
    } */

    if (!state.center && data?.getStores?.items.length) {
      const [firstResult] = data.getStores.items
      const { latitude, longitude } = firstResult.address.location
      const center = ofData.shippingData?.address?.geoCoordinates ?? [
        longitude,
        latitude,
      ]

      handleCenter(center, 10)
    }

    const stores =
      data?.getStores?.items.sort((a, b) => {
        if (a.distance < b.distance) {
          return -1
        }

        if (a.distance > b.distance) {
          return 1
        }

        return 0
      }) ?? []

     
      

      const estados = stores.map(item => item.address.state)
                .filter((value, index, self) => {
                 
                  return self.indexOf(value) === index
                
                })

      const municipios = stores.map(item => item.address.city)
      .filter((value, index, self) => {
        
       
        return self.indexOf(value) === index
      
      })


      const _stores =  stores.map((item: any) => {
        return item
      })
      .filter((item: any) => {

        if(municipiosFilter.length > 0 || estadosFilter.length > 0)
        {
          return municipiosFilter.includes(item.address.city) || estadosFilter.includes(item.address.state)
        }
        return true

      });



    var changeFilter = (event) => {
      setFilter(event.target.value)
    }  
    var changeCity = (event) => {

      var _municipiosFilter =  municipiosFilter;
      if(event.target.checked)
      {

        _municipiosFilter.push(event.target.value)
        setMunicipiosFilter(_municipiosFilter); 
      }
      else{
        setMunicipiosFilter(removeItemAll(municipiosFilter,event.target.value));
      }
      console.log(municipiosFilter)
     
      loadAll()
    }  
    var changeEstado = (event) => {

      var _estadosFilter =  estadosFilter;
      if(event.target.checked)
      {

        _estadosFilter.push(event.target.value)
        setEstadosFilter(_estadosFilter); 
      }
      else{
        setEstadosFilter(removeItemAll(estadosFilter,event.target.value));
      }
      console.log(estadosFilter)
     
     loadAll()
    }  
    var goSearch = () => {
      loadAll();
      //setFilter('')
    }  


    function removeItemAll(arr, value) {
      var i = 0;
      while (i < arr.length) {
        if (arr[i] === value) {
          arr.splice(i, 1);
        } else {
          ++i;
        }
      }
      return arr;
    }

    return (
      <div className={`flex flex-row ${handles.container}`}>
        <div className={`flex-col w-30 ${handles.storesListCol}`}>
          
          
        <div className={`  ${handles.content_filter}`}>
        
        <div className={`${handles.filter_input_content}`}>
          <input className={`${handles.filter_input}`} type="text" name="search-store"  onChange={changeFilter} />
          <button className={`${handles.filter_button}`} onClick={goSearch} >Buscar</button>
        </div>
        

        <div className={` ${handles.filter_municipio}`}>

                <Collapsible
              header={
                <span className={`c-action-primary hover-c-action-primary fw5 ${handles.mun_space}`}>
                  
                  Buscar por municipios y/o alcaldias
                </span>
              }
              onClick={e => setIsOpenMunicipio(e.target.isOpen)}
              isOpen={isOpenMunicipio}>
              <div className={`mt4 ${handles.des_space}`}>
     
              <ul className={` ${handles.filter_lista}`}>
              {
                
                municipios.map((city: any, index:any) => {
                  
                  
                  return (<li><label><input type="checkbox" name={"city"+index} value={city} onClick={(e)=>{changeCity(e)}}  />&nbsp;{city}</label></li>)
                })
                
              }
              </ul>
              </div>
              </Collapsible>
        </div>


        <div className={` ${handles.filter_estado}`}>

                <Collapsible
              header={
                <span className={`c-action-primary hover-c-action-primary fw5 ${handles.mun_space}`}>
                  Buscar por estado
                </span>
              }
              onClick={e => setIsOpenEstado(e.target.isOpen)}
              isOpen={isOpenEstado}>
              <div className={`mt4 ${handles.des_space}`}>
              
     
              <ul className={` ${handles.filter_lista}`}>
              {
                
                estados.map((state: any, index:any) => {
                  return (<li><label><input type="checkbox" name={"state"+index} value={state} onClick={(e)=>{changeEstado(e)}}   />&nbsp;{state}</label></li>)
                })
              }
              </ul>
              </div>
              </Collapsible>
        </div>

        </div>



          {loading && <Spinner />}
          {!loading && !!data && stores.length > 0 && (
            <div className={`overflow-auto h-100 ${handles.storesList}`}>
              
              
        


              <Listing items={_stores} onChangeCenter={handleCenter} />
              {!state.allLoaded && (
                <span
                  className={`mt2 link c-link underline-hover pointer ${handles.loadAll}`}
                  onClick={() => {
                    loadAll()
                  }}
                >
                  <FormattedMessage id="store/load-all" />
                </span>
              )}
            </div>
          )}
          {!loading && !!data && stores.length === 0 && (
            <div className={handles.noResults}>
              <FormattedMessage id="store/none-stores" />
            </div>
          )}
        </div>
        <div className={`flex-col w-70 ${handles.storesMapCol}`}>
          {!loading &&
            !!data &&
            googleMapsKeys?.logistics?.googleMapsKey && (
              <Pinpoints
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsKeys.logistics.googleMapsKey}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div
                    className={handles.listingMapContainer}
                    style={{ height: `100%` }}
                  />
                }
                mapElement={<div style={{ height: `100%` }} />}
                items={data.getStores.items}
                zoom={state.zoom}
                center={state.center}
                icon={icon}
                iconWidth={iconWidth}
                iconHeight={iconHeight}
              />
            )}
        </div>
      </div>
    )
  }

  return null
}

export default injectIntl(
  compose(
    graphql(ORDER_FORM, {
      name: 'orderForm',
      options: {
        ssr: false,
      },
    }),
    graphql(GOOGLE_KEYS, {
      name: 'googleMapsKeys',
      options: {
        ssr: false,
      },
    })
  )(StoreList)
)
