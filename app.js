// jshint esversion:6
const express = require("express");
const bodyparser = require("body-parser");

const app = express();

let items = ["eat food","make food","order food"];
let newworkitems = [];

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    // var today = new Date();
    // var curday = today.getDay();
    // var day = ""

    // if(curday === 6 || curday === 0)
    // {
    //     day="weekend";
    // }
    // else{
    //     day="weekday";
    //     // res.sendFile(__dirname + "/index.html");
    // }

    // OR

    // switch (curday) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thrusday";
    //         break;
    //     case 5:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log("Erros: the currentday is = " + curday);

    // }

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", { kindofday: day, newlistitem: items });

});

app.post("/", function (req, res) {
    let item = req.body.newitem;
    console.log(item);
    if(req.body.button === "work"){
        newworkitems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    // console.log(item);
   
});

app.get("/work",function(req,res){
    res.render("list",{kindofday: "work",newlistitem:newworkitems})
});


app.listen("3000", function () {
    console.log("server is running up at 3000 port");
});