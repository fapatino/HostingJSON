const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
app = express()

var url = require('url');
var dt = require('./date-time');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 2

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))

// The app.get functions below are being processed in Node.js running on the server.
// Implement a custom About page.
app.get('/about', (request, response) => {
	console.log('Calling "/about" on the Node.js server.')
	response.type('text/plain')
	response.send('About Node.js on Azure Template.')
})

app.get('/version', (request, response) => {
	console.log('Calling "/version" on the Node.js server.')
	response.type('text/plain')
	response.send('Version: '+majorVersion+'.'+minorVersion)
})

// Return the value of 2 plus 2.
app.get('/2plus2', (request, response) => {
	console.log('Calling "/2plus2" on the Node.js server.')
	response.type('text/plain')
	response.send('4')
})

// Add x and y which are both passed in on the URL. 
app.get('/add-two-integers', (request, response) => {
	console.log('Calling "/add-two-integers" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let x = parseInt(inputs.x)
	let y = parseInt(inputs.y)
	let sum = x + y
	response.type('text/plain')
	response.send(sum.toString())
})

// Template for calculating BMI using height in feet/inches and weight in pounds.
app.get('/calculate-bmi', (request, response) => {
	console.log('Calling "/calculate-bmi" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	const heightFeet = parseInt(inputs.feet)
	const heightInches = parseInt(inputs.inches)
	const weight = parseInt(inputs.lbs)

	console.log('Height:' + heightFeet + '\'' + heightInches + '\"')
	console.log('Weight:' + weight + ' lbs.')

	// Todo: Implement unit conversions and BMI calculations.
	// Todo: Return BMI instead of Todo message.

	response.type('text/plain')
	response.send('Todo: Implement "/calculate-bmi"')
})

// Test a variety of functions.
app.get('/test', (request, response) => {
    // Write the request to the log. 
    console.log(request);

    // Return HTML.
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h3>Testing Function</h3>')

    // Access function from a separate JavaScript module.
    response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");

    // Show the full url from the request. 
    response.write("req.url="+request.url+"<br><br>");

    // Suggest adding something tl the url so that we can parse it. 
    response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
    
	// Parse the query string for values that are being passed on the URL.
	var q = url.parse(request.url, true).query;
    var txt = q.year + " " + q.month;
    response.write("txt="+txt);

    // Close the response
    response.end('<h3>The End.</h3>');
})

// Return Batman as JSON.
var batMan = {
	"firstName":"Bruce",
	"lastName":"Wayne",
	"preferredName":"Batman",
	"email":"darkknight@lewisu.edu",
	"phoneNumber":"800-bat-mann",
	"city":"Gotham",
	"state":"NJ",
	"zip":"07101",
	"lat":"40.73",
	"lng":"-74.17",
	"favoriteHobby":"Flying",
	"class":"cpsc-24700-001",
	"room":"AS-104-A",
	"startTime":"2 PM CT",
	"seatNumber":"3",
	"inPerson":[
		"Monday",
		"Wednesday"
	],
	"virtual":[
		"Friday"
	]
}

app.get('/batman', (request, response) => {
	console.log('Calling "/batman" on the Node.js server.')
	response.type('application/json')
	response.send(JSON.stringify(batMan, null, 4))
})

// Return SpiderMan as JSON.
var spiderMan = {
	"firstName":"Peter",
	"lastName":"Parker",
	"preferredName":"Spider-Man",
	"email":"WebHead@lewisu.edu",
	"phoneNumber":"800-555-5555",
	"city":"Queens",
	"state":"NY",
	"zip":"17921",
	"lat":"40.73",
	"lng":"-74.17",
	"favoriteHobby":"Web Slinging",
	"class":"cpsc-24700-001",
	"room":"AS-104-A",
	"startTime":"2 PM CT",
	"seatNumber":"16",
	"inPerson":[
	],
	"virtual":[
		"Monday",
		"Wednesday",
		"Friday"
	]
}

app.get('/spiderman', (request, response) => {
	console.log('Calling "/spiderman" on the Node.js server.')
	response.type('application/json')
	response.send(JSON.stringify(spiderMan, null, 4))
})

// Return Francisco as JSON.
var Francisco = {
	"firstName":"Francisco",
	"lastName":"Patino",
	"preferredName":"Fran",
	"email":"franciscoapatino@lewisu.edu",
	"city":"Joliet",
	"state":"IL",
	"zip":"60435",
	"favoriteHobby":"Watching TV",
	"class":"cpsc-24500-001",
	"room":"AS-104-A",
	"startTime":"2 PM CT",
	"seatNumber":"21",
	"inPerson":[
		"Monday",
		"Wednesday"
	],
	"virtual":[
		"Friday"
	]
}

app.get('/Francisco', (request, response) => {
	console.log('Calling "/Francisco" on the Node.js server.')
	response.type('application/json')
	response.send(JSON.stringify(Francisco, null, 4))
})

// Return SpongeBob as JSON.
var Sponge = {
	"firstName":"SpongeBob",
	"lastName":"SquarePants",
	"preferredName":"Sponge",
	"email":"krustkrab@lewisu.edu",
	"city":"Bikini Bottom",
	"favoriteHobby":"Working",
	"startTime":"2 PM CT",
	"seatNumber":"10",
	"inPerson":[
		"Monday",
		"Wednesday",
		"Friday"
	],
	"virtual":[
	]
}

app.get('/Sponge', (request, response) => {
	console.log('Calling "/Sponge" on the Node.js server.')
	response.type('application/json')
	response.send(JSON.stringify(Sponge, null, 4))
})

// Return indexList
var indexList = [
	{ "Name":"Francisco Patino", "Email":"franciscoapatino@lewisu.edu", "ContactURL":"https://faphostingjson.azurewebsites.net/Francisco" }, 
	{ "Name":"Francisco Patino", "Email":"franciscoapatino@lewisu.edu", "ContactURL":"https://faphostingjson.azurewebsites.net/Batman" }, 
	{ "Name":"Francisco Patino", "Email":"franciscoapatino@lewisu.edu", "ContactURL":"https://faphostingjson.azurewebsites.net/Sponge" }, 
	{ "Name":"Francisco Patino", "Email":"franciscoapatino@lewisu.edu", "ContactURL":"https://faphostingjson.azurewebsites.net/Spiderman" } 
	
]

app.get('/indexList', (request, response) => {
	console.log('Calling "/indexList" on the Node.js server.')
	response.type('application/json')
	response.send(JSON.stringify(indexList, null, 4))
})


// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)
