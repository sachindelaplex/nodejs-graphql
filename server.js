const keyPublishable = "pk_test_QwIrQK39BEuA3mvIuojg051f"; // Enter the key here
const keySecret = "sk_test_VPXcGgPe4Gl2tSOEzalcAFj7";

const express = require("express");
const bodyParse = require("body-parser");
const graphqlHttp = require("express-graphql");
const stripe = require("stripe")(keySecret);
const app = express();
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const graphQLSchema = require("./graphql/schema/index");
const graphQLResolver = require("./graphql/resolver/index");
const isAuth = require("./middleware/is-auth");
const cors = require("cors");

app.use(cors());
app.use(bodyParse.json());

mongoose
  .connect("mongodb://localhost:27017/eventgraphql")
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolver,
    graphiql: true
  })
);

app.post("/pay", function(req, res) {
  let amount = req.body.amount;

  // create a customer
  stripe.customers
    .create({
      email: "sachin@gmail.com", // customer email
      source: req.body.token.id // token for the card
    })
    .then(customer => {
      console.log(customer);
      stripe.charges.create({
        // charge the customer
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
      });
    })
    .then(charge => {
      console.log("Completed");
      // res.render("pay");
    }); // render the payment successful alter page after payment
});
