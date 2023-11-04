import axios from "axios";

const searchBaseURL = "http://localhost:3000/v1/search/";

export const getDataByName = async (cityName) => {
  try {
    const data = await axios.get(
      `${searchBaseURL}searchByName?name=${cityName}`
    );
    return data.data;
  } catch (e) {
    return { error: "API error" };
  }
};

export const getDataByLngLat = async (lat, lng) => {
  try {
    const data = await axios.get(
      `${searchBaseURL}searchByLatLng?lat=${lat}&lng=${lng}`
    );
    return data.data;
  } catch (e) {
    return { error: "API error" };
  }
};

export const getRankingDataByAQI = async () => {
  try {
    const data = await axios.get(
      `http://localhost:3000/v1/ranking/airQualityData?rankBy=aqi`
    );
    return data.data;
  } catch (e) {
    return { error: "API error" };
  }
};

