# CS35L-project
Web application for reviewing and ranking UCLA dining halls


Setting up MongoDB:
Make sure you've cloned the repository onto your local device
Log into MongoDB Atlas (in browser) 
Find the database CS35L Project 
Go to database access and add yourself as a user (use something random for the password, don't use any of your actual passwords)
Go back to the database tab, click connect, and then connect your application
Copy the connection string starting with "mongodb+srv://username:<password>"...
In the root of the cloned directory, create a file called config.env
Add these 2 lines to config.env:

```
PORT=5000
DB_URI= "your_connection_string"
```

Your connection string should be the one you copied from MongoDB online; make sure to replace <password> with your password 
Note: If your password contains the characters : / ? # [ ] @ they will have to be percent-encoded (replace ':' with %3A, '/' with %2F, '#' with %23, '[' with %5B, ']' with %5D, '@' with %40)

Setting up frontend:
Go to frontend directory
Run: 
  
```
npm install
```
  
To test your connection:
  
```
cd server.js
node server.js
```
  
You should see "Database connection successful" and "Connected to port 5000"
