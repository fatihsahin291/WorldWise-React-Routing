import {
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import styles from "./Map.module.css";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { map } from "leaflet";

function Map() {
	const navigate = useNavigate();
	const { cities } = useCities();

	const [mapPosition, setMapPosition] = useState([
		51.505, 0,
	]);

	const [searchParams] = useSearchParams();

	const mapLat = searchParams.get("lat");
	const mapLng = searchParams.get("lng");

	useEffect(() => {
		if (mapLat && mapLng) {
			setMapPosition([mapLat, mapLng]);
		}
	}, [mapLat, mapLng]);

	return (
		<div className={styles.mapContainer}>
			<MapContainer
				center={[
					mapLat ? mapLat : 51.505,
					mapLng ? mapLng : 0,
				]}
				zoom={8}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						key={city.id}
						position={[
							city.position.lat,
							city.position.lng,
						]}
					>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();

	map.setView(position, 8);

	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => {
			console.log(e);
			navigate(
				`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`
			);
		},
	});
}

export default Map;
