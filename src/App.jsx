import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";

function App() {
	const [topTeams, setTopTeams] = useState([]);

	const handleClick = () => {
		const newList = [...topTeams];
		const shuffledList = shuffle(newList);
		setTopTeams(shuffledList);
	};

	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"http://site.api.espn.com/apis/site/v2/sports/football/college-football/rankings"
			);

			const teamData = await response.json();

			console.log(teamData.rankings[0].headline);
			console.log(teamData.rankings[0].ranks);

			setTopTeams(teamData.rankings[0].ranks);
		};

		fetchData().catch((err) => console.log(err.message));
	}, []);

	const top25 = topTeams.map((team) => (
		<Col key={team.team.id} xs={6} sm={4} md={3} lg={2} className="my-2">
			<Image thumbnail src={team.team.logo} />
			<p>#{team.current}</p>
		</Col>
	));

	return (
		<Container fluid>
			<Row>{top25}</Row>
			<Row>
				<button onClick={handleClick}>Shuffle</button>
			</Row>
		</Container>
	);
}

export default App;
