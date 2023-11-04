import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from "../components/Legend";
import Optionsfield from "../components/OptionsField";
// import './Map.css';
import data from "../data/data.json";

const HeatMapTest2 = () => {
    const options = [
        {
          name: "AQI",
          description: "Estimated Air Quality Index",
          property: "aqi_est",
          stops: [
            ["Good", "#AFE1AF"],
            ["Moderate", "#FBEC5D"],
            ["Unhealthy for sensitive", "#F28C28"],
            ["Unhealthy", "#FF2400"],
            ["Very Unhealthy", "#CF9FFF"],
            ["Hazardous", "#800020"],
          ],
        },
        {
          name: "PM2.5 level",
          description: "Estimated PM2.5 level",
          property: "pm2_est",
          stops: [
            ["Good", "#AFE1AF"],
            ["Moderate", "#FBEC5D"],
            ["Unhealthy for sensitive", "#F28C28"],
            ["Unhealthy", "#FF2400"],
            ["Very Unhealthy", "#CF9FFF"],
            ["Hazardous", "#800020"],
          ],
        },
        {
          name: "PM10 level",
          description: "Estimated PM10 level",
          property: "pm10_est",
          stops: [
            ["Good", "#AFE1AF"],
            ["Moderate", "#FBEC5D"],
            ["Unhealthy for sensitive", "#F28C28"],
            ["Unhealthy", "#FF2400"],
            ["Very Unhealthy", "#CF9FFF"],
            ["Hazardous", "#800020"],
          ],
        },
        {
          name: "Ozone level",
          description: "Estimated Ozone level",
          property: "ozone_est",
          stops: [
            ["Good", "#AFE1AF"],
            ["Moderate", "#FBEC5D"],
            ["Unhealthy for sensitive", "#F28C28"],
            ["Unhealthy", "#FF2400"],
            ["Very Unhealthy", "#CF9FFF"],
            ["Hazardous", "#800020"],
          ],
        },
      ]
  const mapContainerRef = useRef(null);
  const [active, setActive] = useState(options[0]);
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
          'rgba(175,225,175,0)',
          0.2,
          'rgb(251,236,93)',
          0.4,
          'rgb(242,140,40)',
          0.6,
          'rgb(255,36,0)',
          0.8,
          'rgb(207,159,255)',
          1,
          'rgb(128,0,32)'
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
          map.setPaintProperty("countries", "heatmap-color", {
            property: active.property,
            stops: active.stops,
          });
          setMap(map)
      })
      return () => map.remove();
  },[])

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty("countries", "heatmap-color", {
        property: active.property,
        stops: active.stops,
      });
    }
  };

  const changeState = (i) => {
    setActive(options[i]);
    map.setPaintProperty("countries", "heatmap-color", {
      property: active.property,
      stops: active.stops,
    });
  };
  return (
    <div>
      <div
        style={{ height: "100vh" }}
        ref={mapContainerRef}
        className="map-container"
      />
      <Legend active={active} stops={active.stops} />
      <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      />
    </div>
  );
}

export default HeatMapTest2;
