const DaysForcast = (props) => {
    
    const {forcastData} = props
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const getDay = weekday[new Date(forcastData.dt_txt).getDay()]
    const getTime = forcastData.dt_txt.split(" ")[1].slice(0,5)
    const convertTime = getTime.slice(0,2) === "00" ? `12:00 Am` : Number(getTime.slice(0,2)) > 12 ? `${Number(getTime.slice(0,2)) - 12}:00 Pm` : `${Number(getTime.slice(0,2))}:00 Am`

    return ( 
        <>
        <div className={`flex flex-col items-center min-w-full sm:min-w-[25%] text-stone-50`}>
            <div className="h-100">
            <img src={`./images/${forcastData.weather[0].main}.png`} alt="" />
            </div>
            <h2 className="text-2xl">{Math.trunc(forcastData?.main?.temp)}&deg; / {forcastData.weather[0].main}</h2>
            <h3  className="text-xs	">{getDay} / {convertTime}</h3>
            </div>
        </>
     );
}
 
export default DaysForcast;