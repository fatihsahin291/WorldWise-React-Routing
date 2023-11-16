import {
	createContext,
	useEffect,
	useContext,
	useReducer,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:3001";

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return {
				...state,
				isLoading: true,
			};
		case "cities/loaded":
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case "city/loaded":
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
			};
		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
			};
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(
					(city) => city.id !== action.payload
				),
			};
		case "rejected":
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			throw new Error(
				"Unhandled action type: " + action.type
			);
	}
}

function CitiesProvider({ children }) {
	// const [cities, setCities] = useState([]);
	// const [isLoading, setIsLoading] =
	// 	useState(false);
	// const [currentCity, setCurrentCity] = useState(
	// 	{}
	// );

	const [
		{ cities, isLoading, currentCity, error },
		dispatch,
	] = useReducer(reducer, initialState);

	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: "loading" });
			try {
				const res = await fetch(
					`${BASE_URL}/cities`
				);

				const data = await res.json();

				dispatch({
					type: "cities/loaded",
					payload: data,
				});
			} catch (err) {
				dispatch({
					type: "rejected",
					payload: err.message,
				});
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(
				`${BASE_URL}/cities/${id}`
			);

			const data = await res.json();
			console.log(data);
			dispatch({
				type: "city/loaded",
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: "rejected",
				payload: err.message,
			});
		}
	}

	async function createCity(newCity) {
		dispatch({ type: "loading" });
		try {
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

			dispatch({
				type: "city/created",
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: "rejected",
				payload: err.message,
			});
			alert(
				"There was an error creating the city"
			);
		}
	}

	async function deleteCity(id) {
		dispatch({ type: "loading" });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});

			dispatch({
				type: "city/deleted",
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: "rejected",
				payload: err.message,
			});
			alert(
				"There was an error deleting the city"
			);
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
				deleteCity,
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
