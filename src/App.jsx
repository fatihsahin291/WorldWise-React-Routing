import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import { useState, useEffect } from "react";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";

const BASE_URL = "http://localhost:3001";

function App() {
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
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route
					path="product"
					element={<Product />}
				/>
				<Route
					path="pricing"
					element={<Pricing />}
				/>
				<Route path="login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					<Route
						index
						element={
							<CityList
								isLoading={isLoading}
								cities={cities}
							/>
						}
					/>
					<Route
						path="cities"
						element={
							<CityList
								isLoading={isLoading}
								cities={cities}
							/>
						}
					/>
					<Route
						path="countries"
						element={<p>List of countries</p>}
					/>
					<Route
						path="form"
						element={<p>Form</p>}
					/>
				</Route>
				<Route
					path="*"
					element={<PageNotFound />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
