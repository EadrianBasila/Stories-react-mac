import React from 'react';

 class TomtomMaps extends React.Component {
   componentDidMount() { 
     const script = document.createElement('script');
     script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
     document.body.appendChild(script);
     script.async = true;
     script.onload = function () {
       window.tomtom.L.map('map', {
         source: 'vector',
         key: 'IFtSE2MH4pH9NWEVuAYOADCyGo9FNSOC',
         center: [14.58268, 120.97858],
         basePath: '/sdk',
         zoom: 17
       });
     }
   }
 
   render() {
     return <div id = 'map'></div>
   }
 } 
 export default TomtomMaps;