import React, { useState, useEffect } from "react";
import "./states.css";
const States = () => {
  const [statedis, setStatedis] = useState(true);
  const [citydis, setCitdis] = useState(true);
  const [final, setFinal] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [citites, setCitites] = useState([]);
  useEffect(() => {
    let res = async () => {
      try {
        let response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        let data = await response.json();
        console.log(data, "this is countries");
        setCountry(data);
      } catch (err) {
        console.log(err);
      }
    };
    res();
  }, []);
  useEffect(() => {
    let res = async () => {
      try {
        let response = await fetch(
          `https://crio-location-selector.onrender.com/country=${final.country}/states`
        );
        let data = await response.json();
        console.log(data, "this is state data");

        setStates(data);
      } catch (err) {
        console.log(err);
      }
    };
    res();
  }, [statedis]);
  useEffect(() => {
    let res = async () => {
      try {
        let response = await fetch(
          ` https://crio-location-selector.onrender.com/country=${final.country}/state=${final.state}/cities`
        );
        let data = await response.json();
        console.log(data, "this is state data");
        setCitites(data);
      } catch (err) {
        console.log(err);
      }
    };
    res();
  }, [citydis]);

  const onchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "country") {
      setStatedis(false);
    } else if (name === "state") {
      setCitdis(false);
    }
    setFinal({ ...final, [name]: value });
  };
  console.log(final);
  console.log(statedis, "value of this one");
  return (
    <div>
      <h1>Select Location</h1>
      <div>
        <select name="country" onChange={onchange}>
          <option value="select country" disabled>
            Select Country
          </option>
          {country.map((val) => (
            <option value={val}>{val}</option>
          ))}
        </select>
        <select name="state" disabled={statedis} onChange={onchange}>
          <option value="select State" disabled>
            Select State
          </option>
          {states.map((val) => (
            <option value={val}>{val}</option>
          ))}
        </select>
        <select name="city" disabled={citydis} onChange={onchange}>
          <option value="select City" disabled>
            Select City
          </option>
          {citites.map((val) => (
            <option value={val}>{val}</option>
          ))}
        </select>
      </div>
      {final.country && final.state && final.city ? (
        <h4>
          You selected {final.city}, {final.state}, {final.country}
          {/* You selected Panaji, Goa, India' */}
          {/* You selected Panaji, Goa, India */}
        </h4>
      ) : (
        ""
      )}
    </div>
  );
};

export default States;
