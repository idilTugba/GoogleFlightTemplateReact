const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY || "";
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST || "";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type FlightSearchParams = {
  currentLocationSkyId: string;
  destinationSkyId: string;
  currentLocationEntityId: string;
  destinationEntityId: string;
  date: string;
};

type QueryFunctionContext = {
  queryKey: [string, FlightSearchParams | null];
};

export const fetchAirportData = async (searchTerm: string) => {
  console.log("Fetching airport data for:", searchTerm);
  const response = await fetch(
    `${API_BASE_URL}/flights/searchAirport?query=${searchTerm}&locale=en-US`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch airport data");
  }
  const data = await response.json();
  console.log("Airport Data Response:", data);
  return data.data || [];
};

export const fetchFlights = async ({ queryKey }: QueryFunctionContext) => {
  console.log("APİ");
  const [_key, params] = queryKey;
  if (!params) return;

  console.log(_key);
  const response = await fetch(
    `${API_BASE_URL}/flights/searchFlights?originSkyId=${params.currentLocationSkyId}&destinationSkyId=${params.destinationSkyId}&originEntityId=${params.currentLocationEntityId}&destinationEntityId=${params.destinationEntityId}&date=${params.date}&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }
  const data = await response.json();
  return Array.isArray(data.data.itineraries) ? data.data.itineraries : [];
};
