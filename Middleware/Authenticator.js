import jwt from "jsonwebtoken";
import config from "config";

function authenticate(request, response, next) {
  //Authenticate the user
  const token = request.header("x-auth-token");
  if (!token)
    return response.status(401).send("Access denied! No token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    request.user = decoded;
    next();
  } catch (ex) {
    return response.status(400).send("Invalid Token");
  }
}

export default authenticate;
