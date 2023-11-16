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
	const [currentCity, setCurrentCity] = useState(
		{}
	);

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

	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(
				`${BASE_URL}/cities/${id}`
			);

			const data = await res.json();
			console.log(data);
			setCurrentCity(data);
		} catch (err) {
			alert(err.message);
		} finally {
			setIsLoading(false);
		}
	}

	async function createCity(newCity) {
		try {
			setIsLoading(true);
			const res = await fetch(
				`${BASE_URL}/cities`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newCity),
				}
			);

			const data = await res.json();
			console.log(data);

			setCities([...cities, data]);
		} catch (err) {
			alert(err.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
			}}
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
