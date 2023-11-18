import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense, lazy } from "react";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// dist/assets/index-b561f73c.css   31.32 kB │ gzip:   5.23 kB
// dist/assets/index-bee9325f.js   528.25 kB │ gzip: 149.66 kB

////////////////////////////

// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-380f4eeb.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-c6f6e207.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-69cf9a67.css           27.65 kB │ gzip:   4.53 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-96af2899.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-6609549b.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-e73d3a57.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-a25ed178.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-a7b62864.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-e6c274f5.js           0.85 kB │ gzip:   0.49 kB
// dist/assets/Login-0d3b9a58.js             1.07 kB │ gzip:   0.57 kB
// dist/assets/AppLayout-6da8caa1.js       156.95 kB │ gzip:  46.16 kB
// dist/assets/index-f826da49.js           369.62 kB │ gzip: 103.07 kB

const Product = lazy(() =>
	import("./pages/Product")
);
const Pricing = lazy(() =>
	import("./pages/Pricing")
);
const Homepage = lazy(() =>
	import("./pages/Homepage")
);
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() =>
	import("./pages/AppLayout")
);
const PageNotFound = lazy(() =>
	import("./pages/PageNotFound")
);

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense
						fallback={<SpinnerFullPage />}
					>
						<Routes>
							<Route
								index
								element={<Homepage />}
							/>
							<Route
								path="product"
								element={<Product />}
							/>
							<Route
								path="pricing"
								element={<Pricing />}
							/>
							<Route
								path="login"
								element={<Login />}
							/>
							<Route
								path="app"
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}
							>
								<Route
									index
									element={
										<Navigate
											replace
											to="cities"
										/>
									}
								/>
								<Route
									path="cities"
									element={<CityList />}
								/>
								<Route
									path="cities/:id"
									element={<City />}
								/>
								<Route
									path="countries"
									element={<CountryList />}
								/>
								<Route
									path="form"
									element={<Form />}
								/>
							</Route>
							<Route
								path="*"
								element={<PageNotFound />}
							/>
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
