import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";

function App() {
	const [topTeams, setTopTeams] = useState([]);
	const [score, setScore] = useState(0);
	const [clickedTeams, setClickedTeams] = useState([]);

	const handleClick = (teamId) => {
		const newList = [...topTeams];
		const shuffledList = shuffle(newList);
		setTopTeams(shuffledList);

		console.log(teamId);
		let allClicked = clickedTeams;
		//also need to track which teams have been clicked, and set a state/value for them
		if (allClicked.includes(teamId)) {
			//reset the game clock
			setScore(0);
			setClickedTeams([]);
			alert("No Good! You already got that one. Try again");
		} else {
			//Game is still on!
			setScore(score + 1);

			//add to clickedTeams
			allClicked.push(teamId);
			setClickedTeams(allClicked);
			console.log(clickedTeams);
		}
	};

	const shuffle = (array) => {
		return array.sort(() => Math.random() - 0.5);
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://site.api.espn.com/apis/site/v2/sports/football/college-football/rankings"
			);

			const teamData = await response.json();

			//console.log(teamData.rankings[0].headline);
			//console.log(teamData.rankings[0].ranks);

			//trim #25 for neat display
			if (teamData.rankings[0].ranks.length > 24) {
				teamData.rankings[0].ranks.pop();
			}
			setTopTeams(teamData.rankings[0].ranks);
		};

		fetchData().catch((err) => console.log(err.message));
	}, []);

	const top24 = topTeams.map((team) => (
		<Col
			key={team.team.id}
			xs={6}
			sm={4}
			md={3}
			lg={2}
			className="my-2 mx-auto"
		>
			<Card
				bg="dark-subtle px-3 py-2"
				onClick={() => handleClick(team.team.id)}
			>
				<Card.Img variant="top" src={team.team.logo}></Card.Img>
				<Card.Body className="p-0">
					<Card.Title>
						<div>{team.team.nickname}</div>
						<div>{team.team.name}</div>
					</Card.Title>
				</Card.Body>
			</Card>
		</Col>
	));

	return (
		<Container fluid>
			<Row className="mb-4">
				<div className="fs-3 fw-bold">NCAA Football Recall</div>
				<div>
					Click the teams to earn points, but only click each team once!
				</div>
				<div className="fw-bold">Current Score: {score}</div>
			</Row>
			<Row>{top24}</Row>
			{/* 			<Row>
				<button onClick={handleClick}>Shuffle</button>
			</Row> */}
		</Container>
	);
}

export default App;
