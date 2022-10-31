const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

//components
const Connection = require('./connection/db.js');
const User = require('./models/userModel');
const routes = require('./routes/routes.js');

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = 8000;

Connection(process.env.MONGO_URL);

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
        }
        res.locals.loggedInUser = await User.findById(userId); next();
    } else {
        next();
    }
});

app.use('/', routes)

app.listen(process.env.PORT || PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

