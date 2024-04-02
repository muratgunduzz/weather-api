import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerHalf, faCity, faCloud } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import City from "./City";

function App() {
  const key = "d6501e5664a072711d7c97760b83369f";
  const [search, setSearch] = useState("");
  const [city, setCity] = useState();

  useEffect(() => {
    async function getApi() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}&units=metric`
        );
        console.log(response);
        setCity(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getApi();
  }, [search]);

  return (
    <div className="App">
      <div className="card">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Enter city name"
          className="input-field"
        />
        {city && (
          <div className="city-info">
            <h2>{city.name}</h2>
            <div className="info-block">
              <FontAwesomeIcon icon={faThermometerHalf} />
              <p>Temperature: {city.main.temp} °C</p>
            </div>
            <div className="info-block">
              <FontAwesomeIcon icon={faCity} />
              <p>City: {city.name}</p>
            </div>
            <div className="info-block">
              <FontAwesomeIcon icon={faCloud} />
              <p>Weather: {city.weather[0].description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
