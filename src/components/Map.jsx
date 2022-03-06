import React from 'react'
import { useState } from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps'
import beerShevaData from '../data/beerSheva.json';


const Map = (props) => (
  
  <>
      <GoogleMap
        defaultCenter={props.location}
        defaultZoom={props.zoomLevel || 9}
      >


      {beerShevaData.map((item) => (
        <Marker key={item.name} position={{lat: parseFloat(item.lat), lng: parseFloat(item.lon)}} />

      ))}
   
        </GoogleMap>
      </>


)

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap;