const Event = require("../../Models/event");
const User = require("../../Models/user");
const { dateToString } = require("../../helpers/date");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};
const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvent: events.bind(this, user.createdEvent)
    };
  } catch (err) {
    throw err;
  }
};
const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: user.bind(this, booking.user),
    event: singleEvent.bind(this, booking.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};
exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
//   exports.user = user;
//   exports.events = events;
// exports.singleEvent = singleEvent;
