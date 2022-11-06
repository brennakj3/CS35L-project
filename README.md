# CS35L-project
Web application for reviewing and ranking UCLA dining halls


### Setting up MongoDB: ###

Make sure you've cloned the repository onto your local device. Log into MongoDB Atlas (in browser). Find the database called CS35L Project. Go to database access and add yourself as a user (use something random for the password, don't use any of your actual passwords).

Go back to the database tab, click connect, and then connect your application.

Copy the connection string starting with "mongodb+srv://username:<password>"...

In the root of the project directory, create a file called config.env. Add these 2 lines to config.env:

```
PORT=5000
DB_URI= "your_connection_string"
```

Your connection string should be the one you copied from MongoDB online; make sure to replace <password> with your password 


Note: If your password contains the characters : / ? # [ ] @ they will have to be percent-encoded (replace ':' with %3A, '/' with %2F, '#' with %23, '[' with %5B, ']' with %5D, '@' with %40)

### Setting up project for the first time: ###

Inside the root directory of the project, run: 
  
```
cd frontend
npm install
```

After you have installed the frontend, run:
```
cd ..
npm install
```

### Running the project: ###

Open a terminal. Go to the root directory and run:

```
cd server
node server.js
```

You should see "Database connection successful" and "Server is running on port: 5000"

Open a second terminal. In this terminal, go to the root directory and run:

```
cd frontend
npm start
```

Note: The server has to be running while the React app is open in order to access the MongoDB database.