const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
var app = express();







app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){

	res.sendFile(__dirname + "/sign.html");
	
});

app.post("/",function(req,res){
	var num1 = req.body.n1;
	var num2 = req.body.n2;
	var num3 = req.body.n3;
	console.log(num1);
	console.log(num2);
	console.log(num3);



	var data = {
	members: [
	        {
				email_address: num3,
				status: "subscribed",
		        
		        merge_fields: {
			                      FNAME: num1, 
			                      LNAME: num2
		                        }
	        }
	    ]
	
    };
    var jsonData = JSON.stringify(data);

	var options = {
		// url: "http://us4.api.mailchimp.com/3.0/lists/e33b1acd26",
		// url: "https://us4.admin.mailchimp.com/lists/members?id=370309#p:1-s:10-sa:last_update_time-so:false/e33b1acd26",
		url: "https://us4.api.mailchimp.com/3.0/lists/e33b1acd26",
		method: "POST",
		headers: {
		  "Authorization": "hello b6110580aa67189ab1bd026c04a44e0d-us4" },
		
        


		body: jsonData,

	};

	request(options,function(error,response,body){
		if(error){
			console.log(error);
		}
		else{
			console.log(response.statusCode);
		}




		if(error || response.statusCode !=200 ){

			
			res.sendFile(__dirname + "/failure.html");
            

			
		}
		else {
			
		     res.sendFile(__dirname + "/success.html");
            

			

		}


		}); 

});

app.post("/failure",function(req,res){



	res.redirect("/");






});


app.listen(process.env.PORT || 3000,function(req,res){
	console.log("Server is running on 3000 port")
});


// b6110580aa67189ab1bd026c04a44e0d-us4
// e33b1acd26