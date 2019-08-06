const Event = require("../../Models/event");
const {transformEvent } = require('./merge');

module.exports = {
  events: async () => {
    const events = await Event.find();
    try {
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args,req) => {
      if(!req.isAuth){
          throw new Error('Unauhenticated!');
      }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId
    });
    let createdEvents;
    try {
      const result = await event.save();
      createdEvents = transformEvent(result);
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error("User is not found");
      }
      creator.createdEvent.push(event);
      await creator.save();
      return createdEvents;
    } catch (err) {
      throw err;
    }
  }
};
