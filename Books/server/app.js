const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();



app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(4000, () => {
  console.log("server running on 4000")
});