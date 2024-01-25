import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardSection from "./components/CardSection";
import GraphComp from "./components/GraphComp";
import Navbar from "./components/Navbar";

function App() {
  const [apiData, setApiData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://2.233.121.120:1085/energy.php");
      let res = response.data;
      res["date"] = res["date"] + " " + res["time"];
      setApiData(res);
    } catch (err) {
      console.error(err);
      alert("Enable CORS in Browser!");
    }
  };

  console.log(apiData);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 7000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //every 7 seconds, data is fetched coz of set interval



  // function to convert data
  const ChartData = (data) => {
    if (!data) {
       return [];
    }
   
    const includedKeys = ["batt", "grid", "home", "solar", "surplus"];
    let result = [];
   
    for (let key in data) {
       if (includedKeys.includes(key)) {
          result.push({
            name: key.replace(/_/g, " ").toUpperCase(),
            value: data[key],
          });
       }
    }
   
    return result;
   };



   const CardData = (data) => {
    if (!data) {
       return [];
    }
   
    const includedKeys = [
       "date",
       "batt",
       "batt_perc",
       "grid",
       "home",
       "powerwall_connection_status",
       "powerwall_connection_timeout",
       "powerwall_response_time",
       "solar",
       "surplus",
    ];
    let result = [];
   
    for (let key in data) {
       if (includedKeys.includes(key)) {
          result.push({
            name: key.replace(/_/g, " ").toUpperCase(),
            value: data[key],
          });
       }
    }
   
    return result;
   };

  return (
    <div>
      <div className="container bg-[#000000]">
        <div className="pt-20 flex flex-col gap-3 justify-center items-center">
          <Navbar />
          {apiData?.powerwall_connection_status === "0" ? (
            <div>
              <h1 className="text-white font-bold text-lg lg:text-xl">
                DATA NOT AVAILABLE
              </h1>
              <img
                src="https://i.postimg.cc/QNB7xwGR/close.png"
                className="w-15 h-15"
                alt="img"
              />
            </div>
          ) : (
            <div>
              <GraphComp data={ChartData(apiData)} />
              <CardSection data={CardData(apiData)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
