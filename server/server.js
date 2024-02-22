const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbConnect = require('./DbConnect/DbConnect');
const User = require('./Schema/UserSchema')
const Chat = require('./Schema/ChatSchema')
const auth = require("./auth");

dotenv.config(); 
const app = express();
const port = process.env.PORT || 8000;
dbConnect();

//cors handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});



// MongoDB connection URI


// Use body-parser middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "your_password"
  }'
*/

// register endpoint currenly not throwing unique email error :0 on purpose
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
/*
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "your_password"
  }'
*/

app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication 
/*
curl http://localhost:8000/auth-endpoint \
  -H "Authorization: Bearer your_token"
*/
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});


// GET Endpoint for Chats
app.get("/chats", auth, async (request, response) => {
  try {
    const senderId = request.query.senderId;
    const receiverId = request.query.receiverId;

    const chats = await Chat.find({  $or: [{ senderId: senderId },{senderId:receiverId } ,{ receiverId: receiverId },{ receiverId: senderId }], });
    response.status(200).json({ chats });
  } catch (error) {
    response.status(500).json({ message: "Error fetching chats", error });
  }
});

// POST Endpoint for Chats
app.post("/chats", auth, async (request, response) => {
  try {
    const { senderId, receiverId, name, message, timestamp } = request.body;
    
    const newChat = new Chat({
      senderId,
      receiverId,
      name,
      message,
      timestamp,
    });

    const savedChat = await newChat.save();
    response.status(201).json({ message: "Chat message created successfully", chat: savedChat });
  } catch (error) {
    response.status(500).json({ message: "Error creating chat message", error });
  }
});


// ... (remaining code)
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
