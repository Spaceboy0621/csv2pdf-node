const path = require ('path')
const express = require('express')
var pdf = require('html-pdf');

const app  = express()
const publicDirectory  = path.join(__dirname,'../public')
app.use(express.static(publicDirectory))

//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");
// Read HTML Template
var html = fs.readFileSync("template.html", "utf8");

const request = require('request')
const csv = require('csvtojson')
 


// this function is what we want to do if someone visit this particular path 
app.get('' ,(req,res)=>{
	res.send("Hello Express")
})
app.get('/' ,(req,res)=>{
    console.log("Something!")
    res.send("Hello Express")       
})

app.get('/pdf' ,(req,res)=>{
	var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };

	const csvFilePath='./addresses.csv'
	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
	    console.log(jsonObj);
	    var document = {
		html: html,
			data: {
				users: jsonObj,
			},
			path: "./output.pdf",
			type: "",
		};

		pdf
		  .create(document, options)
		  .then((res) => {
		    console.log(res);
		  })
		  .catch((error) => {
		    console.error(error);
		  });
	})
	 
	// Async / await usage
	const jsonArray = csv().fromFile(csvFilePath);

    console.log("Something!")
    res.send("Hello Express PDF")       
})
app.listen(4000,"", ()=> {
    console.log('Server is on 4000');
})