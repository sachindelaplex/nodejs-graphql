const authResolver = require("./auth");
const bookingResolver = require("./booking");
const eventsResolver = require("./event");
const itemsResolver = require("./item");
const brandResolver = require("./brand");
const categoryResolver = require("./category");
const attributeResolver = require("./attribute");

const rootResolver = {
  ...authResolver,
  ...bookingResolver,
  ...eventsResolver,
  ...itemsResolver,
  ...brandResolver,
  ...categoryResolver,
  ...attributeResolver
};

module.exports = rootResolver;
