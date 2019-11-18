const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();


app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "super",
	password: "Sokx0B#QPfS1i5@",
	database: "places"
};


const pool = new Pool(config);


app.get("/hello", (req, res) => {
	res.json("Hello World");
});


//GET list of users
app.get("/api", async (req, res) => {
	try {
		let type;
		if (req.query.q == "movies" || req.query.q == "Movies"){
			const template = "SELECT movie, theater, address, city, zip FROM movies";
			const response = await pool.query(template);	
			res.json({type: 'movies', results: response.rows});
		}
		else {
			const template = "SELECT movie, theater, address, city, zip FROM movies WHERE movie ilike $1";
			const response = await pool.query(template,[`%${req.query.q}%`]);
			if(response.rowCount == 0){
				type = 'stores';
				const template2 = "SELECT DISTINCT stores.name, types.typeName, stores.address, stores.city, stores.zip FROM stores join types on stores.storeID = types.storeID WHERE stores.name ilike $1 OR types.typeName ilike $1 ORDER BY stores.name;";
				const response2 = await pool.query(template2,[`%${req.query.q}%`]);
				res.json({type: 'stores', results: response2.rows});
			}else{
				type = 'movies';
				res.json({type: 'movies', results: response.rows});
			}
			
		}
	}catch(err){
		console.log("in catch of /list-users" + err);
	}

});

/*
//POST creating a user
app.post("/create-user", async (req, res) =>{
	const username = req.body.username;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const email = req.body.email;

	try{
		const template = "SELECT username FROM users WHERE username = $1;"; 
		const response = await pool.query(template, [username]);

		if (response.rowCount == 0){
			const template = "INSERT INTO users (username, firstname, lastname, email) values ($1, $2, $3, $4)";
			const response = await pool.query(template, [
				username,
				firstname,
				lastname,
				email
			]);
			res.json({ "status": "user added"});
		}
		else{
			res.json({"status": "username taken"});
		}
	}catch(err){
		console.log("In catch of /create-user" + err);
	}
});
*/

app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}`);
});
