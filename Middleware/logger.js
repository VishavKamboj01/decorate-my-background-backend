function log(request, response, next) {
  //Get Data about the user from the database and then log him...
  console.log("Logging in the User");
  next();
}

export default log;
