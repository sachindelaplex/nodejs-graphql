const Category = require("../../Models/category");
const { transformCategory } = require("./merge");

module.exports = {
  category: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauhenticated!");
    }
    try {
      const category = await Category.find();
      return category.map(value => {
        return transformCategory(value);
      });
    } catch (err) {
      throw err;
    }
  },
  createCategory: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauhenticated!");
    }
    const category = new Category({
      name: args.categoryInput.name,
      status: args.categoryInput.status
    });
    const result = await category.save();
    return transformCategory(result);
  }
};
