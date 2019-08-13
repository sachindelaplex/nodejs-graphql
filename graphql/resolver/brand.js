const  Brand = require("../../Models/brand");
const { transformBrand  } = require("./merge");

module.exports = {
  brands: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauhenticated!");
    }
    try {
      const brands = await Brand.find();
      return brands.map(brand => {
        return transformBrand(brand);
      });
    } catch (err) {
      throw err;
    }
  },
  createBrand: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauhenticated!");
    }
    const brand = new Brand({
        name: args.brandInput.name,
        status: args.brandInput.status
    });
    const result = await brand.save();
    return transformBrand(result);
  },
};
