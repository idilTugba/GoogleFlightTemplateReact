import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAirportData, fetchFlights } from "./Api";
import AirportSelect, { Airport } from "./components/selectBox";
import FlightList from "./components/flightList";

export type FlightSearchParams = {
  currentLocationSkyId: string;
  destinationSkyId: string;
  currentLocationEntityId: string;
  destinationEntityId: string;
  date: string;
};

const FlightSearch = () => {
  const queryClient = useQueryClient();

  const { data: listofAirports } = useQuery({
    queryKey: ["listofAirports"],
    queryFn: () => fetchAirportData("a"),
  });

  const [currentLocation, setCurrentLocation] = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);
  const [date, setDate] = useState("");
  const [searchParams, setSearchParams] = useState<FlightSearchParams | null>(
    null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["googleFlight", searchParams],
    queryFn: fetchFlights,
    enabled: !!searchParams,
  });

  const handleSearch = () => {
    console.log(data);
    console.log("Current Location:", currentLocation);
    console.log("Destination:", destination);
    console.log("Date:", date);
    if (currentLocation?.entityId && destination?.entityId && date) {
      setSearchParams({
        currentLocationSkyId: currentLocation.entityId,
        destinationSkyId: destination.entityId,
        currentLocationEntityId: currentLocation.entityId,
        destinationEntityId: destination.entityId,
        date,
      });
      queryClient.invalidateQueries({ queryKey: ["googleFlight"] });
    }
  };

  return (
    <div className="container">
      <h1>Flight Search</h1>
      <div className="searchContainer">
        <AirportSelect
          label="Current Location"
          value={currentLocation?.entityId || ""}
          onChange={(e) => {
            const selectedAirport = listofAirports?.find(
              (airport: Airport) => airport.entityId === e
            );
            console.log("Setting Current Location:", selectedAirport);
            setCurrentLocation(selectedAirport ?? null);
          }}
          airports={listofAirports || []}
        />
        <AirportSelect
          label="Destination"
          value={destination?.entityId || ""}
          onChange={(value) => {
            const selectedAirport = listofAirports?.find(
              (airport: Airport) => airport.entityId === value
            );
            console.log("Setting Destination:", selectedAirport);
            setDestination(selectedAirport ?? null);
          }}
          airports={listofAirports || []}
        />
        <input
          className="border p-2 w-full"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search Flights"}
        </button>
      </div>
      <FlightList searchParams={searchParams} />
    </div>
  );
};

export default FlightSearch;
