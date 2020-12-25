const express=require("express");
const body_=require("body-parser");
const request=require("request");
const https=require("https");
// // app.use()
const app=express();
app.use('/Public', express.static('Public'));
app.use(body_.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

})

// app.send
app.post("/",function(req,res){
  // console.log("hi");
  // res.send("Success");
  const fir=req.body.f;
  const sec=req.body.s;
  const email=req.body.e;
  console.log(fir);
  var data={
    "members": [
      {
        email_address: email,
        status: "subscribed",
        // update_existing: false,
        merge_fields: {
          FNAME: fir,
          LNAME: sec
        },}],
        // "update_existing": false,
  }
  const url="https://us7.api.mailchimp.com/3.0/lists/058513e869";
  const options={
    method:"POST",
    auth: "Ayush:03af5188740131d05a3da1c5c33c6d89-us7"
  }
  const jsonDATA=JSON.stringify(data);
  const request= https.request(url,options, function(response){
              console.log(response.statusCode);

              if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");

              }
              else{
                res.sendFile(__dirname+"/failure.html");
              }
              response.on("data",function(data){
                console.log(JSON.parse(data));
              })

  })
  request.write(jsonDATA);
  request.end();
})

app.post("/failure",function(res,req){
    req.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
console.log("Running....");
})

// ba0f298ce867500f65ad69e6e1af8bee-us7
// ba0f298ce867500f65ad69e6e1af8bee-us7
// 058513e869
