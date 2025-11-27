require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db')

const app = express();
const PORT = 5000 || process.env.PORT;

//Connect to DB
connectDB();


app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret : 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));
app.use(methodOverride('_method'));


app.use(express.static('public'));

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/home'));
app.use('/', require('./server/routes/main'));



app.get('/add-post', (req, res) => {
  res.render('add-post'); // no need for .ejs extension
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    // Save the user to DB (optional for now)

    // Redirect back to login page after registration
    res.redirect("/login");
});


// app.post("/blogs", (req, res) => {
//     res.render("blogs");
// });

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});

