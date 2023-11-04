import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Legend from "../components/Legend";
import Optionsfield from "../components/OptionsField";
// import './Map.css';
import data from "../data/data.json";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Map = () => {
  const options = [
    // {
    //   name: "AQI",
    //   description: "Estimated Air Quality Index",
    //   property: "aqi_est",
    //   stops: [
    //     ["Good", "#AFE1AF"],
    //     ["Moderate", "#FBEC5D"],
    //     ["Unhealthy for sensitive", "#F28C28"],
    //     ["Unhealthy", "#FF2400"],
    //     ["Very Unhealthy", "#CF9FFF"],
    //     ["Hazardous", "#800020"],
    //   ],
    // },
    // {
    //   name: "PM2.5 level",
    //   description: "Estimated PM2.5 level",
    //   property: "pm2_est",
    //   stops: [
    //     [0, "#f8d5cc"],
    //     [1000, "#f4bfb6"],
    //     [5000, "#f1a8a5"],
    //     [10000, "#ee8f9a"],
    //     [50000, "#ec739b"],
    //     [100000, "#dd5ca8"],
    //     [250000, "#c44cc0"],
    //     [5000000, "#9f43d7"],
    //     [10000000, "#6e40e6"],
    //   ],
    // },
    // {
    //   name: "PM10 level",
    //   description: "Estimated PM10 level",
    //   property: "pm10_est",
    //   stops: [
    //     [0, "#f8d5cc"],
    //     [1000, "#f4bfb6"],
    //     [5000, "#f1a8a5"],
    //     [10000, "#ee8f9a"],
    //     [50000, "#ec739b"],
    //     [100000, "#dd5ca8"],
    //     [250000, "#c44cc0"],
    //     [5000000, "#9f43d7"],
    //     [10000000, "#6e40e6"],
    //   ],
    // },
    // {
    //   name: "Ozone level",
    //   description: "Estimated Ozone level",
    //   property: "ozone_est",
    //   stops: [
    //     [0, "#f8d5cc"],
    //     [1000, "#f4bfb6"],
    //     [5000, "#f1a8a5"],
    //     [10000, "#ee8f9a"],
    //     [50000, "#ec739b"],
    //     [100000, "#dd5ca8"],
    //     [250000, "#c44cc0"],
    //     [5000000, "#9f43d7"],
    //     [10000000, "#6e40e6"],
    //   ],
    // },
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

 
  const mapContainerRef = useRef(null);
  const [active, setActive] = useState(options[0]);
  const [map, setMap] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/sagor60/cloialudf003j01prgw21f3jd",
      center: [5, 34],
      zoom: 1.5,
    });

    map.on("load", () => {
      map.addSource("countries", {
        type: "geojson",
        data,
      });

      map.setLayoutProperty("country-label", "text-field", [
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

      map.addLayer(
        {
          id: "countries",
          type: "fill",
          source: "countries",
        },
        "country-label"
      );

      map.setPaintProperty("countries", "fill-color", {
        property: active.property,
        stops: active.stops,
      });

      setMap(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty("countries", "fill-color", {
        property: active.property,
        stops: active.stops,
      });
    }
  };

  const changeState = (i) => {
    setActive(options[i]);
    map.setPaintProperty("countries", "fill-color", {
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
};

export default Map;
