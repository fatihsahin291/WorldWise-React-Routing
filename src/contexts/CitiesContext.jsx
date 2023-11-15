import {
	createContext,
	useState,
	useEffect,
	useContext,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:3001";

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] =
		useState(false);

	useEffect(() => {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(
					BASE_URL + "/cities"
				);

				const data = await res.json();
				setCities(data);
			} catch (err) {
				alert(err.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	return (
		<CitiesContext.Provider
			value={{ cities, isLoading }}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);

	if (context === undefined)
		throw new Error(
			"CitiesContext usedoutside of the cities provider"
		);

	return context;
}

export { CitiesProvider, useCities };
