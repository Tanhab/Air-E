import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Legend from "../components/Legend";
import Optionsfield from "../components/OptionsField";
// import './Map.css';
import data from "../data/data.json";
import { flytoAtom } from "../atoms/flytoAtom";
import { selectedPropertyAtom } from "../atoms/propertySelected";
import { useRecoilState } from "recoil";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const options = [
  {
    name: "Total GDP",
    description: "Estimate total GDP in millions of dollars",
    property: "gdp",
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
    property: "gdp_per_capita",
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
    property: "gdp_growth",
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
    property: "population",
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
    property: "population_growth",
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

const MapPopulation = () => {

 
  const mapContainerRef = useRef(null);
  const [active, setActive] = useState(options[0]);
  const [map, setMap] = useState(null);

  
  const [flyTo, setFlyTo] = useRecoilState(flytoAtom);
  const [selectedProperty, setSelectedProperty] = useRecoilState(selectedPropertyAtom);

  useEffect(() => {
    if (flyTo) {
      map.flyTo({
        center: [flyTo.lng, flyTo.lat],
        essential: true,
        zoom: 7,
        speed: 0.8,
      });
    }
  }, [flyTo]);

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
        data:'http://localhost:3000/v1/geojson/populationData'
      });

      map.setLayoutProperty("country-label", "text-field", [
        "format",
        ["get", active.property],
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
    setSelectedProperty({
      type:'population',
      property:active.property
    })
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

export default MapPopulation;
