# Flight Search App

🎥 [YouTube Video Demo](https://youtu.be/_SvhpPTbysA)

## Overview

This is a simple flight search application built with **React, TypeScript, and React Query**. The app allows users to search for flights by selecting their departure and destination airports along with a travel date. It fetches flight data from the **Sky-Scrapper API**.

## Features

- **Search for airports** using an API query
- **Select departure and destination airports**
- **Pick a date** and search for available flights
- **Fetch and display flight results**
- **Uses React Query for efficient data fetching and caching**
- **Responsive design**

## Tech Stack

- **React** (Vite setup)
- **TypeScript**
- **React Query** for API requests
- **Pure CSS** for styling

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/flight-search-app.git
cd flight-search-app
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_RAPIDAPI_KEY=your-api-key
VITE_RAPIDAPI_HOST=sky-scrapper.p.rapidapi.com
VITE_API_BASE_URL=https://sky-scrapper.p.rapidapi.com/api/v1
```

### 4. Run the Application

```sh
npm run dev
```

The application should now be running at `http://localhost:5173`.

## Project Structure

```
/src
  ├── components
  │   ├── FlightList.tsx   # Displays flight results
  │   ├── SelectBox.tsx    # Select dropdown component for airports
  ├── Api.ts               # API fetch functions
  ├── App.tsx              # Main application logic
  ├── index.tsx            # Entry point
  ├── styles.css           # Styling
```

## How It Works

1. The user selects airports from the dropdown.
2. A date is selected.
3. Clicking **Search Flights** triggers an API request.
4. Flights are fetched and displayed using **React Query**.

## API Usage

- **Fetching Airports**: The app queries the **Sky-Scrapper API** to fetch airport data based on a search term.
- **Fetching Flights**: The app retrieves flight details based on selected airports and date.

## Future Improvements

- Improve airport search to fetch a full list instead of a keyword search.
- Add sorting and filtering options for flights.
- Enhance UI/UX with more design elements.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

🚀 **Happy Coding!**
