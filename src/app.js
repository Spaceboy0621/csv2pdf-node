const path = require ('path')
const express = require('express')

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
	const header_content = '<div style="margin : 0 auto; width: 80%"><table><tr><td style="width: 400px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path d="M494.782 340.02c-.803-81.025 66.084-119.907 69.072-121.832-37.595-54.993-96.167-62.552-117.037-63.402-49.843-5.032-97.242 29.362-122.565 29.362-25.253 0-64.277-28.607-105.604-27.85-54.32.803-104.4 31.594-132.403 80.245C29.81 334.457 71.81 479.58 126.816 558.976c26.87 38.882 58.914 82.56 100.997 81 40.512-1.594 55.843-26.244 104.848-26.244 48.993 0 62.753 26.245 105.64 25.406 43.606-.803 71.232-39.638 97.925-78.65 30.887-45.12 43.548-88.75 44.316-90.994-.969-.437-85.029-32.634-85.879-129.439l.118-.035zM414.23 102.178C436.553 75.095 451.636 37.5 447.514-.024c-32.162 1.311-71.163 21.437-94.253 48.485-20.729 24.012-38.836 62.28-33.993 99.036 35.918 2.8 72.591-18.248 94.926-45.272l.036-.047z"/></svg></td><td style="width: 400px; text-align: right;"><span style="color: black; font-size: 25px;"><span style="font-weight: bold;">BATCH:7299177019</span><br><span style="color: black; font-size: 25px;">5 of 750</span></td></tr></table></div>'
	// console.log(header_content)
	var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "30mm",
            contents: header_content
        },
        footer: {
            height: "20mm",
            contents: {
                default: '<div style="margin : 0 auto; width: 80%"><table><tr><td style="width: 400px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path d="M494.782 340.02c-.803-81.025 66.084-119.907 69.072-121.832-37.595-54.993-96.167-62.552-117.037-63.402-49.843-5.032-97.242 29.362-122.565 29.362-25.253 0-64.277-28.607-105.604-27.85-54.32.803-104.4 31.594-132.403 80.245C29.81 334.457 71.81 479.58 126.816 558.976c26.87 38.882 58.914 82.56 100.997 81 40.512-1.594 55.843-26.244 104.848-26.244 48.993 0 62.753 26.245 105.64 25.406 43.606-.803 71.232-39.638 97.925-78.65 30.887-45.12 43.548-88.75 44.316-90.994-.969-.437-85.029-32.634-85.879-129.439l.118-.035zM414.23 102.178C436.553 75.095 451.636 37.5 447.514-.024c-32.162 1.311-71.163 21.437-94.253 48.485-20.729 24.012-38.836 62.28-33.993 99.036 35.918 2.8 72.591-18.248 94.926-45.272l.036-.047z"/></svg></td><td style="width: 400px; text-align: right;"><span style="color: black; font-size: 25px;"><span style="font-weight: bold;">NYC DEFT OF DE</span><br><span style="color: black; font-size: 25px;">PS 105</span></td></tr></table></div>',
                // 2: '<div style="margin : 0 auto; width: 80%">Second page</div>', // Any page number is working. 1-based index
                // default: '<div style="margin : 0 auto; width: 80%">Middle page</div>', // fallback value
                // last: '<div style="margin : 0 auto; width: 80%">Last page</div>'
            }
        }
    };

	const csvFilePath='./addresses.csv'
	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
	    // console.log(jsonObj);
	    var document = {
			html: html,
			data: {
				users: jsonObj,
			},
			path: "./output.pdf",
			type: "",
		};

		// pdf
		//   .create(document, options)
		//   .toFile("sample.pdf", function(err, res) {
		//     if (err) {
	 //            console.error(err);
	 //            callback();
		//     } 
		// });

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