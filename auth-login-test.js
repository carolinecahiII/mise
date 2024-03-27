import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//import dotenv from "dotenv";
//dotenv.config()


// Database connection configuration
// Create a MySQL connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toroymoi',
    database: 'social'
});


// test registration into the Database
// do a SELECT first to see if the user exists and if so throw an error;
// if no error do an INSERT

const register = (req, res) => { //request response, gets user data

    // DEBUG
    // console.log(req);
    const {username,email,name, password} = req; // was req.body;

    const q = "SELECT * FROM users WHERE username = ?" //new user
    db.query(q,[username], (err, data) => {
        if(err) return res.status(500).json(err); //return error if not filled in
        // orig if(data.length) return res.status(409).json("User already exists")
        if(data.length) {
           res.status = "User already exists" ;
           return (res.status);
        }
        //encryption
        const salt = bcrypt.genSaltSync(10); 
        const  hash = bcrypt.hashSync(password, salt);
        const values = [
            username.toLowerCase(),email,name,hash //hashes password with generated random number
        ]
        //puts data INTO database

        const q = "INSERT INTO users (`username`, `email`,`name`, `password`) VALUES (?)"
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
        })
    })
        console.log("Account creation successful");
}

// test login  into the Database
// do a SELECT first to see if the user exists and if not  throw an error;
// if no error do a Login
// store an accees token cookie, will need this for web integration later

//log into database for user
const login = (req, res) => { 
    // DEBUG
    // console.log(req);
    const {username} = req; // was req.body;

    const q = "SELECT * FROM users WHERE username = ?" //where username is what the user enters
    db.query(q,[username], (err, data) => { //fills username where the ? is
        if(err) return res.status(500).json(err);
        if(data.length===0) {
           res.status = "User not found " ;
           return (res.status);
        }
        //if user does exist, take and check password
        const userpassword = data[0].password
        const checkPassword = bcrypt.compareSync(req.password, userpassword)
        if(!checkPassword) return res.status(404).json("Wrong Credentials")

        const token = jwt.sign({
            id:data[0].id},
            "secretkey"
        )

        const {password, ...others} = data[0]

      //  TODO use a cookie for web auth but don't need cookies rn
      //res.cookie("accessToken", token, {
      //      httpOnly:true,
      //  }).status(200).json(others)
    })
    console.log("Login successful");
}




// Test data

const inputs = {
  username:"Caroline4",
  email:"carolinecahill99@gmail.com",
  password:"BigSecret",
  name:"cc99",
};

const response = {
  status: "none"
};

console.log(inputs);
register (inputs, response);
login (inputs, response);