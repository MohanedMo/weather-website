import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DaysForcast from "./components/days-forcast";

function App() {
  const baseUrl = "https://api.openweathermap.org/data/2.5";
  const typeWeather = ["weather", "forecast"];
  const myApi = "fa4c363e9ac07fe7cf75b30c3cc5c1b5";

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState();
  const [forcasttWeather, setForcasttWeather] = useState();
  const [locationData, setLocationData] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocation);
  }, []);
  useEffect(() => {
    typeWeather.map((element) => {
      return getWeather(element);
    });
  }, [latitude]);

  // get current Location
  function getLocation(loc) {
    setLatitude(loc.coords.latitude);
    setLongitude(loc.coords.longitude);
  }

  async function getWeather(weather) {
    if (latitude !== undefined && longitude !== undefined) {
      try {
        const response = await fetch(
          `${baseUrl}/${weather}?lat=${latitude}&lon=${longitude}&appid=${myApi}&units=metric`
        );
        const data = await response.json();
        data.list === undefined
          ? setCurrentWeather(data)
          : setForcasttWeather(data);
        setIsLoading(true);
      } catch {
        toast.error("Wrong latitude or longitude");
      }
    }
  }

  async function getCityCoords() {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/city?name=${locationData.name}`,
        {
          headers: {
            "X-Api-Key": "RE222xUCLIHNI98b3wvbwRmzSHKW7uHIZXNHuipt",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setLatitude(data[0].latitude);
      setLongitude(data[0].longitude);
    } catch {
      toast.error("Wrong City");
    }
  }

  async function getCountryCoords() {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${locationData.name}`
      );
      const data = await response.json();
      console.log(data);
      setLatitude(data[0].latlng[0]);
      setLongitude(data[0].latlng[1]);
    } catch {
      toast.error("Wrong Country");
      setLatitude(undefined);
      setLongitude(undefined);
    }
  }

  function getInputsData(e) {
    let data = {};
    data[e.currentTarget.name] = e.currentTarget.value;
    console.log(data);
    setLocationData((prevData) => {
      return { ...prevData, ...data };
    });
  }

  function searchHandle(e) {
    e.preventDefault();
    setIsLoading(false);
    if (locationData.type === "city") {
      getCityCoords();
    } else {
      getCountryCoords();
    }
  }

  return (
    <>
      <div
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url("./images/neda-astani-KWTkd7mHqKE-unsplash.jpg")`,
        }}
      >
        <form className="flex justify-center pt-3" onSubmit={searchHandle}>
          <input
            onChange={getInputsData}
            name="name"
            required
            className="h-10 w-1/3 outline-none px-3"
            type="text"
          />
          <div className="flex flex-col mx-3 text-stone-50">
            <div>
              <input
                onChange={getInputsData}
                required
                type="radio"
                id="city"
                name="type"
                value="city"
              />
              <label htmlFor="city">City</label>
            </div>
            <div>
              <input
                onChange={getInputsData}
                required
                type="radio"
                id="country"
                name="type"
                value="country"
              />
              <label htmlFor="country">Country</label>
            </div>
          </div>
          <button
            className="ml-1.5 px-3 text-white  bg-sky-500 active:bg-cyan-950 duration-100"
            type="submit"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className="whether relative  left-2/4 top-1/2 translate-y-[-50%] translate-x-[-50%] w-full md:w-1/2 backdrop-blur-md h-2/3 ">
          {latitude ? (
            <>
              {!isLoading ? (
                <div className="loader w-fit font-bold font-mono text-3xl before:content-['Loading...']	relative top-2/4 translateY-[-50%] mx-auto animate-[l1_1s_linear_infinite_alternate]"></div>
              ) : (
                <>
                  <div className="current pt-12 flex justify-center text-stone-50">
                    <img
                      src={`./images/${currentWeather?.weather[0]?.main}.png`}
                      alt="rain"
                    />
                    <div className="ml-7">
                      <h1 className="text-5xl">
                        {Math.round(currentWeather?.main?.temp)}&deg;C /{" "}
                        {currentWeather?.weather[0]?.main}
                      </h1>
                      <div className="flex mt-5 items-center">
                        <i className="fa-solid fa-location-dot mr-2"></i>
                        <address>
                          {locationData === undefined
                            ? "Your Location"
                            : locationData.name}
                        </address>
                      </div>
                    </div>
                  </div>
                  <div className="days-forcast relative flex flex flex-nowrap mt-9 w-full overflow-x-auto">
                    {forcasttWeather?.list?.map((element) => (
                      <DaysForcast key={element.dt} forcastData={element} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <h1 className="text-5xl text-red-500 text-center m-0 relative top-2/4 translate-y-[-50%]">
              Please enter location
            </h1>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default App;
