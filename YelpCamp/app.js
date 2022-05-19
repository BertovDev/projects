const express = require("express");
const app = express(); 
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const mongoose = require("mongoose");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/expressError");
const Campground = require("./models/campground");
const {campgroundSchema} = require("./schemas.js");


mongoose.connect("mongodb://localhost:27017/yelp-camp",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.on("error",console.error.bind(console,"Connection Error:"));
db.once("open", () => {
    console.log("Database Connected");
})

app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
//this middlewear log allways no matter the rout or the method
app.use((req,res,next) => {
    console.log(req.method , req.path);
    next();
})

const validateCampground = (req,res,next) => {

    const {error} = campgroundSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg,400);
    } else {
        next();
    }
}


app.get("/",(req,res) => {
    res.render("home");
})


app.get("/campgrounds", async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render("campground/index",{campgrounds});
})

app.get("/campgrounds/new",(req,res) => {
    res.render("campground/new");
})

app.post("/campgrounds", validateCampground,catchAsync(async (req,res,next) => {
    const newCamp = new Campground(req.body.campground);
    await newCamp.save();
    res.redirect(`/campgrounds/${newCamp._id}`);
}))

app.get("/campgrounds/:id", catchAsync(async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render("campground/show",{campground});
}))

app.get("/campgrounds/:id/edit", catchAsync(async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render("campground/edit",{campground});
}))

app.put("/campgrounds/:id", validateCampground,catchAsync(async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`${campground._id}`);
}))

app.delete("/campgrounds/:id", catchAsync(async (req,res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
}))

app.all("*",(req,res,next) => {
    next(new ExpressError("Page not found",404));
})

app.use((err,req,res,next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Something went wrong";
    res.status(statusCode).render("error",{err});
})

app.listen("8080",() => {
    console.log("Listening port 8080");
})