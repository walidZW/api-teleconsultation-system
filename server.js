const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();



//************DATABASE CONNCECTION********** */

const db = require("./models/index");
const Role = db.role;
const dbConfig=require('./config/db.config')



function initial() {
 
    Role.estimatedDocumentCount().then((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "patient"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'patient' to roles collection");
        });
  
        new Role({
          name: "doctor"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'doctor' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    })
  
  }

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });




/********************************** */

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "walid-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



//************************* */




