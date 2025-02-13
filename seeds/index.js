const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100) + 10;
        const camp = new Campground({
            author: '679db0e492bd357c5772641b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dwhmk7jcw/image/upload/v1738134979/YelpCamp/jys1b6fz1tcwkqkshaqx.jpg',
                    filename: 'YelpCamp/jys1b6fz1tcwkqkshaqx',
                }
            ],
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolorum cum magni ea possimus? Dolorem porro nesciunt dolorum quam unde ratione consequuntur neque, veniam, perspiciatis ut non ducimus in iure?',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});