const Booking = require("../../Models/booking");
const Event = require("../../Models/event");
const  Item = require("../../Models/item");
const { transformItems  } = require("./merge");

module.exports = {
  items: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauhenticated!");
    }
    try {
      const items = await Item.find();
      return items.map(item => {
        return transformItems(item);
      });
    } catch (err) {
      throw err;
    }
  },
  createItem: async (args, req) => {
      console.log(args)
      console.log(req.isAuth)
    if (!req.isAuth) {
      throw new Error("Unauhenticated!");
    }
    const item = new Item({
        title: args.itemInput.title,
        brand: args.itemInput.brand,
        category: args.itemInput.category,
        subcategory: args.itemInput.subcategory,
        price: args.itemInput.price,
        oldprice: args.itemInput.oldprice,
        discount: args.itemInput.discount,
        quantity: args.itemInput.quantity,
        rating: args.itemInput.rating, 
        description: args.itemInput.description
    });
    const result = await item.save();
    return transformItems(result);
  },
};
