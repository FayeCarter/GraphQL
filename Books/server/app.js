const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.CONNECTION_STRING, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
mongoose.connection.once("open", () => {
  console.log("database connected");
})

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(4000, () => {
  console.log("server running on 4000")
});