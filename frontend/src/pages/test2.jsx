import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Legend from "../components/Legend";
import Optionsfield from "../components/OptionsField";
// import './Map.css';
import data from "../data/data.json";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapTest2 = () => {
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
    {
      name: "Total GDP",
      description: "Estimate total GDP in millions of dollars",
      property: "gdp_md_est",
      stops: [
        [0, "#f8d5cc"],
        [1000, "#f4bfb6"],
        [5000, "#f1a8a5"],
        [10000, "#ee8f9a"],
        [50000, "#ec739b"],
        [100000, "#dd5ca8"],
        [250000, "#c44cc0"],
        [5000000, "#9f43d7"],
        [10000000, "#6e40e6"],
      ],
    },
    {
      name: "GDP Per capita",
      description: "Estimated GDP per capita",
      property: "gdp_capita_est",
      stops: [
        [0, "#f8d5cc"],
        [1000, "#f4bfb6"],
        [5000, "#f1a8a5"],
        [10000, "#ee8f9a"],
        [50000, "#ec739b"],
        [100000, "#dd5ca8"],
        [250000, "#c44cc0"],
        [5000000, "#9f43d7"],
        [10000000, "#6e40e6"],
      ],
    },
    {
      name: "GDP Growth",
      description: "Estimated GDP growth",
      property: "gdp_growth_est",
      stops: [
        [0, "#f8d5cc"],
        [1000, "#f4bfb6"],
        [5000, "#f1a8a5"],
        [10000, "#ee8f9a"],
        [50000, "#ec739b"],
        [100000, "#dd5ca8"],
        [250000, "#c44cc0"],
        [5000000, "#9f43d7"],
        [10000000, "#6e40e6"],
      ],
    },
    {
      name: "Total Population",
      description: "Estimated total population",
      property: "pop_est",
      stops: [
        [0, "#f8d5cc"],
        [1000, "#f4bfb6"],
        [5000, "#f1a8a5"],
        [10000, "#ee8f9a"],
        [50000, "#ec739b"],
        [100000, "#dd5ca8"],
        [250000, "#c44cc0"],
        [5000000, "#9f43d7"],
        [10000000, "#6e40e6"],
      ],
    },
    {
      name: "Population Growth",
      description: "Estimated population growth",
      property: "pop_growth_est",
      stops: [
        [0, "#f8d5cc"],
        [1000, "#f4bfb6"],
        [5000, "#f1a8a5"],
        [10000, "#ee8f9a"],
        [50000, "#ec739b"],
        [100000, "#dd5ca8"],
        [250000, "#c44cc0"],
        [5000000, "#9f43d7"],
        [10000000, "#6e40e6"],
      ],
    },
  ];

  const mapContainerFillRef = useRef(null);
  const mapContainerHeatRef = useRef(null);
  const [active, setActive] = useState(options[0]);
  const [map1, set1Map] = useState(null);
  const [map2, set2Map] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map2 = new mapboxgl.Map({
      container: mapContainerHeatRef.current,
      style: "mapbox://styles/sagor60/cloialudf003j01prgw21f3jd",
      center: [5, 34],
      zoom: 1.5,
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
          map2.setPaintProperty("countries", "heatmap-color", {
            property: active.property,
            stops: active.stops,
          });
          setMap(map2)
      })
      return () => map2.remove();
  },[])

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map2) {
      map2.setPaintProperty("countries", "heatmap-color", {
        property: active.property,
        stops: active.stops,
      });
    }
    if (map1) {
        map1.setPaintProperty("countries", "fill-color", {
          property: active.property,
          stops: active.stops,
        });
      }
  };

  const changeState = (i) => {
    setActive(options[i]);
    if (i<4)
    {
        map2setPaintProperty("countries", "heatmap-color", {
            property: active.property,
            stops: active.stops,
          });
    }
    else
    {
        map1setPaintProperty("countries", "fill-color", {
            property: active.property,
            stops: active.stops,
          });
    }
  
  };
  useEffect(() => {
    const map1 = new mapboxgl.Map({
      container: mapContainerFillRef.current,
      style: "mapbox://styles/sagor60/cloialudf003j01prgw21f3jd",
      center: [5, 34],
      zoom: 1.5,
    });

    map1.on("load", () => {
      map1.addSource("countries", {
        type: "geojson",
        data,
      });

      map1.setLayoutProperty("country-label", "text-field", [
        "format",
        ["get", "name_en"],
        { "font-scale": 1.2 },
        "\n",
        {},
        ["get", "name"],
        {
          "font-scale": 0.8,
          "text-font": [
            "literal",
            ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
          ],
        },
      ]);

      map1.addLayer(
        {
          id: "countries",
          type: "fill",
          source: "countries",
        },
        "country-label"
      );

      map1.setPaintProperty("countries", "fill-color", {
        property: active.property,
        stops: active.stops,
      });

      setMap(map1);
    });

    // Clean up on unmount
    return () => map1.remove();
  }, []);




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
};

export default MapTest2;
