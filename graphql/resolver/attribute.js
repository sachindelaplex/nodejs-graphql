const Attribute = require("../../Models/attribute");
const { transformAttribute } = require("./merge");

module.exports = {
  attributes: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauhenticated!");
    }
    try {
      const attribute = await Attribute.find();
      return attribute.map(value => {
        return transformAttribute(value);
      });
    } catch (err) {
      throw err;
    }
  },
  createAttribute: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauhenticated!");
    }
    const attributes = new Attribute({
      name: args.attributeInput.name,
      status: args.attributeInput.status
    });
    const result = await attributes.save();
    return transformAttribute(result);
  }
};
