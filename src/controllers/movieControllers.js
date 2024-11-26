const movies = [
	{
		id: 1,
		title: "Citizen Kane",
		director: "Orson Wells",
		year: "1941",
		color: false,
		duration: 120,
	},
	{
		id: 2,
		title: "The Godfather",
		director: "Francis Ford Coppola",
		year: "1972",
		color: true,
		duration: 180,
	},
	{
		id: 3,
		title: "Pulp Fiction",
		director: "Quentin Tarantino",
		year: "1994",
		color: true,
		duration: 180,
	},
];

const database = require("../../database");

const getMovies = (req, res) => {
	let sql = "SELECT * FROM movies";
	const sqlValues = [];

	// if (req.query.max_duration != null) {
	// 	sql += "WHERE duration = ?";
	// 	sqlValues.push(req.query.max_duration);
	// }

	// if (req.query.color != null) {
	// 	sql += " WHERE color = ?";
	// 	sqlValues.push(req.query.color);
	// }

	if (req.query.color !== null && req.query.max_duration !== null) {
		sql += " WHERE duration = ? AND color = ?";
		sqlValues.push(req.query.max_duration);
		sqlValues.push(req.query.color);
	}

	database
		.query(sql, sqlValues)
		.then(([movies]) => {
			res.json(movies);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send("Error retrieving data from database");
		});
};

const getMovieById = (req, res) => {
	const id = parseInt(req.params.id);

	database
		.query("select * from movies where id = ?", [id])
		.then(([movies]) => {
			if (movies[0] != null) {
				res.json(movies[0]);
			} else {
				res.sendStatus(404);
			}
		})
		.catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
};

module.exports = {
	getMovies,
	getMovieById,
};
