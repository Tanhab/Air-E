import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const HeatMapTest = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  

  useEffect(()=>{
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-120, 50],
      zoom: 2
      });

      map.on('load', () => {
        map.addSource('earthquakes', {
          'type': 'geojson',
          'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
          });
           
          map.addLayer(
          {
          'id': 'earthquakes-heat',
          'type': 'heatmap',
          'source': 'earthquakes',
          'maxzoom': 9,
          'paint': {
          // Increase the heatmap weight based on frequency and property magnitude
          'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'mag'],
          0,
          0,
          6,
          1
          ],
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          1,
          9,
          3
          ],
          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparancy color
          // to create a blur-like effect.
          'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.2,
          'rgb(103,169,207)',
          0.4,
          'rgb(209,229,240)',
          0.6,
          'rgb(253,219,199)',
          0.8,
          'rgb(239,138,98)',
          1,
          'rgb(178,24,43)'
          ],
          // Adjust the heatmap radius by zoom level
          'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          2,
          9,
          20
          ],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7,
          1,
          9,
          0
          ]
          }
          },
          'waterway-label'
          );
          setMap(map)
      })
      return () => map.remove();
  },[])
  return  <div style={{height : "100vh"}} ref={mapContainerRef} className='map-container' />
}

export default HeatMapTest;

