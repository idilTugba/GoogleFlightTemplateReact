import { useQuery } from "@tanstack/react-query";
import { fetchFlights } from "../Api";
import { FlightSearchParams } from "../App";

export type Flight = {
  airline: string;
  price: { raw: number; formatted: string };
  duration: string;
  departure: string;
  arrival: string;
  legs: Array<{
    origin: {
      name: string;
      displayCode: string;
      city: string;
      country: string;
    };
    destination: {
      name: string;
      displayCode: string;
      city: string;
      country: string;
    };
    durationInMinutes: number;
    departure: string;
    arrival: string;
    carriers: {
      marketing: Array<{
        name: string;
      }>;
    };
  }>;
};

const FlightList = ({
  searchParams,
}: {
  searchParams: FlightSearchParams | null;
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["googleFlight", searchParams],
    queryFn: fetchFlights,
    enabled: !!searchParams,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No flights.</p>;

  return (
    <div>
      <ul className="flightList">
        {data.map((flight: Flight, index: number) => (
          <li key={index}>
            <div>
              <strong>Airline:</strong>{" "}
              {flight.legs[0].carriers.marketing[0].name}
            </div>
            <div>
              <strong>Kalkış:</strong> {flight.legs[0].origin.displayCode}
            </div>
            <div>
              <strong>Varış:</strong> {flight.legs[0].destination.displayCode}
            </div>
            <div>
              <strong>Price:</strong> {flight.price.formatted}
            </div>
            <div>
              <strong>Duration:</strong> {flight.legs[0].durationInMinutes} min
            </div>
            <div>
              <strong>Departure:</strong> {flight.legs[0].departure}
            </div>
            <div>
              <strong>Arrival:</strong> {flight.legs[0].arrival}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
