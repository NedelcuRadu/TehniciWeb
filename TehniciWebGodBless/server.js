const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const parser = require('xml2json');
const app = express();
const port = process.env.PORT || 1337;
const static = path.join(__dirname, 'SiteDubla2');

app.use(bodyParser.urlencoded({ extended: true })); // URL sanitize
app.use(express.static(static)); // Serve the static website
app.listen(port, function () { console.log("Listening on port ", port); }); // Start server


app.post("/comments.html", function (req, res) {
    console.log(req.body.name);
    fs.readFile(path.join(static, 'comments.xml'), function (err, data) {
        let json = JSON.parse(parser.toJson(data, { reversible: true })); // Transform XML into JSON object
        let temp = {
            NAME:"",
            DATE:"",
            UPVOTES:"",
            DOWNVOTES: "",
            BODY: ""
        };
        let dateOb = new Date();
        // Current day
        let date = ("0" + dateOb.getDate()).slice(-2);

        // Current month
        let month = ("0" + (dateOb.getMonth() + 1)).slice(-2);

        // Current year
        let year = dateOb.getFullYear();

        temp.NAME = req.body.name;
        temp.DATE = date +'-'+ month + '-'+year;
        temp.UPVOTES = 0;
        temp.DOWNVOTES = 0;
        temp.BODY = req.body.content;
        console.log("New comment",temp);
        let comments = json["COMMENTS"]["COMMENT"];
        comments.push(temp);
        console.log("Whole JSON",json["COMMENTS"]);
        //Curate and add comment
        console.log("Comments array", comments);
        if (err)
            console.log(err);
        else
            console.log("Parsed");
        // Write back to file
        let stringified = JSON.stringify(json);
        let xml = parser.toXml(stringified);
        fs.writeFile(path.join(static, 'comments.xml'), xml, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Updated!');
            }
        });
    })
    return res.status(204).send();
}); 