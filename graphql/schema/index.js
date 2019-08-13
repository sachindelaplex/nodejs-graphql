const { buildSchema } = require("graphql");
module.exports = buildSchema(`

type Booking{
    _id:ID!,
    event:Event!,
    user:User!,
    createdAt:String,
    updatedAt:String
}


type Item {
    _id:ID!,
    title:String!,
    brand:String!,
    category:String!,
    subcategory:String!,
    price:String!,
    oldprice:String!,
    discount:String!,
    quantity:String!,
    rating:String!,
    description:String!,
}


type Event {
    _id:ID!,
    title:String!,
    description:String!,
    price:Float!,
    date:String!,
    creator:User!
}

type User {
    _id:ID!,
    email:String!,
    password:String,
    createdEvent: [Event!]
}
type AuthData{
    userId:ID!
    token:String!
    tokenExpiration:Int!
}

type Brand{
    _id:ID!,
    name:String!,
    status:String!
}

input BrandInput{
    name:String!
    status:String!
}

type Category{
    _id:ID!,
    name:String!,
    status:String!
}

input CategoryInput{
    name:String!
    status:String!
}

type Attribute{
    _id:ID!,
    name:String!,
    status:String!,
}

input AttributeInput {
    name:String!
    status:String!
}


input EventInput {
    title:String!
    description:String!
    price:Float!
    date:String!
}

input ItemInput {
    title:String!
    brand:String!
    category:String!
    subcategory:String!
    price:String!
    oldprice:String!
    discount:String!
    quantity:String!
    rating:String!
    description:String!
}


input UserInput {
    email:String!
    password:String
}

type RootQuery{
    events:[Event!]!
    bookings:[Booking!]!
    users:[User!]!
    login(email:String!, password:String!):AuthData!
    items:[Item!]!
    brands:[Brand!]!
    category:[Category!]!
    attributes:[Attribute!]!

}
type RootMutation {
    createEvent(eventInput:EventInput): Event
    createUser(userInput:UserInput): User
    bookEvent(eventId:ID!):Booking!
    cancelBooking(bookingId:ID!):Event!
    createItem(itemInput:ItemInput): Item
    createBrand(brandInput:BrandInput): Brand
    createCategory(categoryInput:CategoryInput): Category
    createAttribute(attributeInput:AttributeInput): Attribute

}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
