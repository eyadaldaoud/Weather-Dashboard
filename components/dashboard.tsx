"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WeatherData } from "./Types";
import Theme from "./Theme";
import Loading from "./loading";

export function Dashboard() {
  const [Weather, setWeather] = useState<WeatherData>();
  const [Location, setLocation] = useState("ny");
  const [isLoading, setLoading] = useState(true);
  const Countries = [
    { code: "ny", country: "New York" },
    { code: "jordan", country: "Amman" },
    { code: "london", country: "London" },
    { code: "toronto", country: "Toronto" },
  ];

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getWeather = async () => {
    setLoading(true);
    try {
      const data: WeatherData = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=fbfc77c8c9a94101804175513231111&q=${Location}&days=3&aqi=no&alerts=no`,
        { method: "GET" }
      ).then((res) => {
        return res.json();
      });
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
    getWeather();
  }, [Location]);

  return (
    <div className="flex flex-col h-screen p-6 dark:text-white text-black">
      <header className="flex justify-between items-center mb-8">
        <h1 className="sm:text-4xl text-xl font-bold p-4">Weather Dashboard</h1>
        <div className="flex gap-4">
          <Theme />
        </div>
      </header>
      {!isLoading ? (
        <main className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-16">
          <div className="dark:bg-zinc-900 bg-gray-100 rounded-lg p-6 flex-1">
            <select
              onChange={(e: any) => setLocation(e.target.value)}
              className="p-2 mb-4  w-full text-base border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option selected>Select a country</option>
              {Countries.map((item, index) => (
                <option key={index} value={item.code}>
                  {item.country}
                </option>
              ))}
            </select>
            <h2 className="text-2xl font-semibold mb-4">Today's Weather</h2>

            <div className="flex items-center gap-4">
              <img
                className=" w-24 h-24"
                alt="Weather image"
                src={Weather?.current.condition.icon}
              />

              <div>
                <h3 className="text-xl font-medium">
                  {Weather?.current.condition.text}
                </h3>
                <p className="text-sm"></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="text-lg font-medium">Temperature</h4>
                <p className="text-2xl">{Weather?.current.temp_c}°C</p>
                <p className="text-2xl">{Weather?.current.temp_f}°F</p>
              </div>
              <div>
                <h4 className="text-lg font-medium">Humidity</h4>

                <p className="text-2xl">{Weather?.current.humidity}%</p>
              </div>
            </div>
          </div>
          <div className="dark:bg-zinc-900 bg-gray-100 rounded-lg p-6 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Weather?.forecast.forecastday.map(
                (
                  item: WeatherData["forecast"]["forecastday"][number],
                  index: number
                ) => (
                  <div className="flex items-center gap-4" key={index}>
                    {isLoading ? (
                      <div className="w-20 h-20 bg-slate-500 animate-pulse rounded" />
                    ) : (
                      <img
                        alt="Weather image"
                        className=" w-12 h-12"
                        src={item.day.condition.icon}
                      />
                    )}

                    <div>
                      <h3 className="text-lg font-medium">
                        {item?.day.condition.text}
                      </h3>
                      <p className="text-sm">{item.day.avgtemp_c}°C</p>
                      <p className="text-sm">{item.day.avgtemp_f}°F</p>{" "}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </main>
      ) : (
        <Loading />
      )}
      <footer className="mt-8">
        <div className="dark:bg-zinc-900 bg-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Current Time</h2>
          <p className="text-xl">{currentTime}</p>
        </div>
        <div className="dark:bg-zinc-900 bg-gray-100 rounded-lg p-6 mt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm">© 2023 Weather Dashboard</p>
            <div className="flex gap-4">
              <Link href="https://eyad.vercel.app">
                <p className="text-sm hover:underline">@Eyad</p>
              </Link>
              <Link href="https://v0.dev/">
                <p className="text-sm hover:underline">@v0</p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
