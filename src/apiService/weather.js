import axios from "axios";

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5';

const KEY = 'cbbbf866360fbe9bbad01f188c2bb1eb';

export const getWeatherByTown = async (town) => {
    const response = await axios.get(`/weather?q=${town}&units=metric&appid=${KEY}`);

    return response.data;
}



