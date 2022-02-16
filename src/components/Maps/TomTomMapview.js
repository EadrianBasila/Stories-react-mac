import React, { useRef, useEffect, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';

function TomtomMaps() { 
  const mapElement = useRef();
  const[map, setMap] = useState({});
  useEffect(() => {      
    let map = tt.map({
      key: 'IFtSE2MH4pH9NWEVuAYOADCyGo9FNSOC',
      container: mapElement.current,
    });

    setMap(map);
  }, []);
  
   return <div ref={mapElement} id="map" />
 
} 

 export default TomtomMaps;