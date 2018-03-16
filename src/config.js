module.exports = {
    PORT: process.env.PORT || 8080,
    // other stuff
    API_BASE_URL: (process.env.NODE_ENV=="development") ?  "http://localhost:3006" : "https://stormy-badlands-44481.herokuapp.com/"  
     
  };