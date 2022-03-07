import React from 'react'
import { useState } from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
import beerShevaData from '../data/beerSheva.json';

function Map(props) {
  const [selectedShelter, setSelectedSheleter] = useState(null)
  return (
    <GoogleMap
        defaultCenter={props.location}
        defaultZoom={props.zoomLevel || 9}
      >
        
        {props.premission ?<Marker position={props.location}></Marker> : null}
      {beerShevaData.map((item) => (
        <Marker
        key={item.name}
        position={{
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon)
        }} 
        onClick={() => {
          setSelectedSheleter(item)
        }}
        />
        
      ))}
      {selectedShelter && (
        <InfoWindow position={{
          lat: parseFloat(selectedShelter.lat),
          lng: parseFloat(selectedShelter.lon)
          }}
          onCloseClick={() => {
            setSelectedSheleter(null);
          }}
          ><div><h2>
        {selectedShelter.name}
          </h2></div></InfoWindow>
      )}
        </GoogleMap>
  )
}



const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap;