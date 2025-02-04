import React from "react";

export interface Airport {
  entityId: string;
  skyId: string;
}

interface AirportSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  airports: Airport[];
}

const AirportSelect: React.FC<AirportSelectProps> = ({
  label,
  value,
  onChange,
  airports,
}) => {
  return (
    <>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select {label}</option>
        {airports.map((airport) => (
          <option key={airport.entityId} value={airport.entityId}>
            {airport.skyId}
          </option>
        ))}
      </select>
    </>
  );
};

export default AirportSelect;
