const express = require("express");
const bodyParser = require("body-parser");
const argon = require("argon2");

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

app.post("/api/login", async(req, res) =>{
	const username = req.body.username;
	const password = req.body.password;
	try{
		const template = "SELECT password, zip from users where username = $1";
		const response = await pool.query(template, [username]);
		if(response.rowCount == 1){
			if(await argon.verify(response.rows[0].password, password)){
				const zip = response.rows[0].zip;
				console.log(username + " " + zip);
				res.json({"status" : "success", "username" : username, "zip" : zip});
			}else{
				res.json({"status" : "Password incorrect"});
			}
		}else{
			res.json({"status" : "Username not found"});
		}
	}catch (err){
		console.log("in catch of /api/login" + err);
	}
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


//POST creating a user
app.post("/api/create-user", async (req, res) =>{
	console.log("in create user backend");
	const username = req.body.username;
	const password = req.body.password;
	const zip = req.body.zip;
	let hash;

	try{
		hash = await argon.hash(password);
		const template = "SELECT username FROM users WHERE username = $1;"; 
		const response = await pool.query(template, [username]);

		if (response.rowCount == 0){
			const template = "INSERT INTO users (username, password, zip) values ($1, $2, $3)";
			const response = await pool.query(template, [
				username,
				hash,
				zip
			]);
			res.json({ "status": "user added"});
		}
		else{
			res.json({"status": "username already exists"});
		}
	}catch(err){
		console.log("In catch of /create-user" + err);
	}
});


app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}`);
});
