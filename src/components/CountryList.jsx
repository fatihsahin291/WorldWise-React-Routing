import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";

function CityList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;

	const countries = cities.reduce((arr, city) => {
		if (
			!arr
				.map((el) => el.country)
				.includes(city.country)
		) {
			return [
				...arr,
				{
					country: city.country,
					emoji: city.emoji,
				},
			];
		} else {
			return arr;
		}
	}, []);

	if (!countries.length)
		return <Message message="Add A Country" />;

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem
					country={country}
					key={country.id}
				/>
			))}
		</ul>
	);
}

export default CityList;
