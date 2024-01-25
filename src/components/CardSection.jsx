import React from "react";
import "../components/card/card.css";

const CardSection = ({ data }) => {
  const getImageSource = (name, value) => {
    switch (name.toLowerCase()) {
      case "date":
        return "https://i.postimg.cc/fW03dJdg/date.png";
      case "batt":
        return value > 0
          ? "https://i.postimg.cc/QMcDMmfp/discharging.png"
          : "https://i.postimg.cc/Bntkh28W/charging.png";
      case "solar":
        return value >= 3
          ? "https://i.postimg.cc/dDP4QTs1/sun.png"
          : value >= 1
          ? "https://i.postimg.cc/QNTLDQSj/sun-behide-clouds.png"
          : "https://i.postimg.cc/Kvx0WBHq/clouds.png";
      case "home":
        return "https://i.postimg.cc/ZnT6wF56/home.png";
      case "grid":
        return value < 0
          ? "https://i.postimg.cc/7YRTzy03/inner.png"
          : "https://i.postimg.cc/CKTBvHvd/outer.png";
      case "powerwall connection status":
        return "https://i.postimg.cc/VvSQGD2Q/status.png";
      case "powerwall connection timeout":
        return "https://i.postimg.cc/g21zvZW4/time-short.png";
      case "powerwall response time":
        return "https://i.postimg.cc/hPTwvQGV/time.png";
      case "surplus":
        return "https://i.postimg.cc/pTyjcjS7/kisspng-clip-art-solar-power-solar-energy-portable-network-5c8d35ba42e338-414752771552758202274.png";
      case "batt perc":
        return value >= 80
          ? "https://i.postimg.cc/J0fz8hMr/battery-full-removebg-preview.png"
          : 79 > value && value > 70
          ? "https://i.postimg.cc/QdbKQpjc/Battery-full-1-removebg-preview.png"
          : 69 > value && value > 50
          ? "https://i.postimg.cc/Y9mSsgBn/battery-full-2-removebg-preview.png"
          : 49 > value && value > 35
          ? "https://i.postimg.cc/8PwTwwrk/battery-full-3-removebg-preview.png"
          : 34 > value && value > 16
          ? "https://i.postimg.cc/NGktfbD8/battery-full-4-removebg-preview.png"
          : 15 > value && value >= 0
          ? "https://i.postimg.cc/cH7pC4R1/battery-full-5-removebg-preview.png"
          : null;

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 py-10">
      {data.map((dat) => {
        const imageSource = getImageSource(dat.name, dat.value);
        return (
          <div className="card" key={dat.name}>
            <div className="content flex justify-center items-center">
              <div className="w-24 h-24">
                {imageSource && (
                  <img src={imageSource} alt="" className="h-24 w-24" />
                )}
              </div>
              <p className="text-lg font-semibold text-center">{dat.name}</p>
              <p className="text-2xl font-extrabold">{dat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardSection;
