import express from "express";
const app = express();

const PORT = 3000;


//app.use((req, res, next) => {
    //const userAuthenticated= true;
    //if(!userAuthenticated){
     //   return res.status(403).send("you are not allowed to make this recipe");
    //}
    //next();
//});
app.use((req, res, next) => {
  console.log(`${req.method} request made to: ${req.url} at ${new Date().toLocaleTimeString()}`);
  next(); 
});


const checkAuth = (req, res, next) => {
  const userAuthenticated = false; 
  if (!userAuthenticated) {
    return res.status(401).send("Access denied: Please log in.");
  }
  next(); 
};


app.get("/", (req, res) => {
  res.send("Welcome to the public home page!");
});


app.get("/dashboard", checkAuth, (req, res) => {
  res.send("Welcome to your dashboard! You are authenticated.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});