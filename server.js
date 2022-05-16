const express =  require("express"); //Serving frontend
const mongodb =  require("mongoose");   //DataBase
var bodyparser = require("body-parser"); //Post request body parser
const next = require("next"); //Frontend rendering
const path = require("path");
const cron = require("node-cron");
const compression = require("compression");
const CodeForcesQuestion = require("./CodeForcesQuestion.js");
const models = require("./model/models.js");
const { codeGreppher } = require("./model/models.js");
const { data } = require("cheerio/lib/api/attributes");



// var DOMAIN = "pro-sequence.tech";
// var api_key = '812de07cee835dc72be3548bcd0bd9ff-7dcc6512-77788330';
// var mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);


var urlencodedParser = bodyparser.urlencoded({ extended: false }) 


const PORT = process.env.PORT || 8000 //Either the server port will or 8000
const dev = process.env.NODE_ENV !== "production";




const app = next({dev});

//MongoDB Connection
mongodb.connect("mongodb+srv://yash_computer:forgetme111@cluster0.dxmvj.mongodb.net/prosequence",{useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log(" WORKING"))
    .catch( (error) => console.log("NOT WORKING ", + error));


mongodb.set('useFindAndModify', false);
var cache = {}
const StartingDate = new Date('11/30/2021');




const schema = new mongodb.Schema(models.prosequence)


const emailSchema = new mongodb.Schema(models.emailSchema)
const placementSchema = new mongodb.Schema(models.placementSchema)
const tutorialSchema = new mongodb.Schema(models.tutorialSchema)
const QuestionTracker = new mongodb.Schema(models.QuestionTracker)
const codesExamples = new mongodb.Schema(models.codeGreppher)

const modal = new mongodb.model("Prosequence" ,  schema);
const emailmodal = new mongodb.model("SubsEmail", emailSchema);
const placementModal = new mongodb.model("PlacementPrep", placementSchema);
const tutorialModal = new mongodb.model("Tutorials", tutorialSchema);
const QuestionTrackerModel = new mongodb.model("QuestionTracker" ,  QuestionTracker);
const codesExamplesModel = new mongodb.model("codesExamples" ,  codesExamples);


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function CreateHtmlTemplate(data){
    var htmlCode = "TotalQuestions Added = " + data.length + " <p></p>"   + "<table cellspacing = 10px cellpadding = 10px  border =  "+"'" + "1px solid black" +"'"+ ">";
        
    htmlCode+= "<tr>";
    htmlCode+= "<th>" + "Index" + "</th>";
    htmlCode+= "<th>" + "Date" + "</th>";
    htmlCode+= "<th>" + "Platform" + "</th>";
    htmlCode+= "<th>" + "Question Title" + "</th>";
    htmlCode+= "</tr>";
    var url = "https://www.prosequence.tech/";

    for(let i=0; i < data.length; i++){
        htmlCode += "<tr>";
        htmlCode += "<td>" + (i+1) + "</td>";
        htmlCode += "<td>" + data[i]["Date"] + "</td>";
        htmlCode += "<td>" + data[i]["Platform"] + "</td>";
        htmlCode += "<td>"+"<a href = " +'"' + url+data[i]["Platform"] +"/" + data[i]["QuestionTitle"] + '"' + ">" + data[i]["QuestionTitle"] +"</a>"+ "</td>";
        htmlCode += "</tr>";
    }
    htmlCode+= "</table>";
    return htmlCode


 }

//Scheduling Scrapper
// cron.schedule("*/10 15-23 * * *", ()=> {
//     //Calling the scheduler
//     const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/KolKata' });
//     const newDate = new Date(date);
//     const newDategetMonth = newDate.getMonth() + 1;
//     const constructedDate = newDate.getDate() + "/" + newDategetMonth + "/" + newDate.getFullYear();


//     if((getRandomInt(6) * 10 === newDate.getMinutes() || getRandomInt(6) * 10 === newDate.getMinutes())){
//             CodeForcesQuestion();
//     }
    
//     if(newDate.getHours() === 23 && newDate.getMinutes() === 50){
//     //Email the number of questions added on that date
        
//         const check = async ()=>{
//             const getAllQuestionTracker = await QuestionTrackerModel.find({Date: constructedDate});
//             var htmlCode = CreateHtmlTemplate(getAllQuestionTracker);




//             console.log("Email Sending")
//         var data = {
//                             from: 'Coding@pro-sequence.tech',
//                             to: "yashagrawal300@gmail.com",
//                             subject: "Questions added today",
//                             html: htmlCode,
                          
//                           };
//                           mailgun.messages().send(data, function (error, body) {
//             });
//     }

//         check()
        
//     }

// }, {
//             scheduled: true,
//             timezone: "Asia/Calcutta"
//           })



// //Scheduling Emails 
// cron.schedule("0 8-14 * * *", ()=> {

//     const currentDate = new Date();
//     const month = currentDate.getMonth() + 1
//     const date = currentDate.getDate()
//     const year = currentDate.getFullYear()
//     const constructedDate = new Date(month + "/" + date + "/" + year);
//     const diffTime = Math.abs(constructedDate - StartingDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
//     const emaildiff = Math.abs(currentDate.getHours() -2);
    
//     const getdata = async () =>{
//         const QuestionsList = await modal.find({platform: "LeetCode"}).select({
//             QuestionTitle: 1,
//             Question: 1
//         }).limit(1).skip(diffDays);

//         const EmailList = await emailmodal.find().select({
//             Email: 1
//         }).limit(92).skip(emaildiff)
//         const QuestionTitle = QuestionsList[0]["QuestionTitle"]
//         const Question = QuestionsList[0]["Question"]

//         for(let i = 0; i<EmailList.length; i++){
//             const Email = EmailList[i]["Email"];        
//             const id = EmailList[i]["_id"];
//             const unsubs = id +"/"+ Email  
//             const htmlCode = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n  <head>\n    <title>pro-sequence</title>\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0 \" />\n    <meta name=\"format-detection\" content=\"telephone=no\" />\n    <!--[if !mso]><!-->\n    <link href=\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700\" rel=\"stylesheet\" />\n    <!--<![endif]-->\n    <style type=\"text/css\">\n      body {\n      -webkit-text-size-adjust: 100% !important;\n      -ms-text-size-adjust: 100% !important;\n      -webkit-font-smoothing: antialiased !important;\n      \n      }\n      p {\n      Margin: 0px !important;\n      Padding: 0px !important;\n      }\n      table {\n      border-collapse: collapse;\n      mso-table-lspace: 0px;\n      mso-table-rspace: 0px;\n      }\n      td, a, span {\n      border-collapse: collapse;\n      mso-line-height-rule: exactly;\n      }\n      .ExternalClass * {\n      line-height: 100%;\n      }\n      span.MsoHyperlink {\n      mso-style-priority:99;\n      color:inherit;}\n      span.MsoHyperlinkFollowed {\n      mso-style-priority:99;\n      color:inherit;}\n      </style>\n      <style media=\"only screen and (min-width:481px) and (max-width:599px)\" type=\"text/css\">\n      @media only screen and (min-width:481px) and (max-width:599px) {\n      table[class=em_main_table] {\n      width: 100% !important;\n      }\n      table[class=em_wrapper] {\n      width: 100% !important;\n      }\n      td[class=em_hide], br[class=em_hide] {\n      display: none !important;\n      }\n      \n      td[class=em_align_cent] {\n      text-align: center !important;\n      }\n      td[class=em_aside]{\n      padding-left:10px !important;\n      padding-right:10px !important;\n      }\n      td[class=em_height]{\n      height: 20px !important;\n      }\n      td[class=em_font]{\n      font-size:14px !important;\t\n      }\n      td[class=em_align_cent1] {\n      text-align: center !important;\n      padding-bottom: 10px !important;\n      }\n      }\n      </style>\n      <style media=\"only screen and (max-width:480px)\" type=\"text/css\">\n      @media only screen and (max-width:480px) {\n      table[class=em_main_table] {\n      width: 100% !important;\n      }\n      table[class=em_wrapper] {\n      width: 100% !important;\n      }\n      td[class=em_hide], br[class=em_hide], span[class=em_hide] {\n      display: none !important;\n      }\n      img[class=em_full_img] {\n      width: 100% !important;\n      height: auto !important;\n      }\n      td[class=em_align_cent] {\n      text-align: center !important;\n      }\n      td[class=em_align_cent1] {\n      text-align: center !important;\n      padding-bottom: 10px !important;\n      }\n      td[class=em_height]{\n      height: 20px !important;\n      }\n      td[class=em_aside]{\n      padding-left:10px !important;\n      padding-right:10px !important;\n      } \n      td[class=em_font]{\n      font-size:14px !important;\n      line-height:28px !important;\n      }\n      span[class=em_br]{\n      display:block !important;\n      }\n      }\n    </style>\n  </head>\n  <body style=\"margin:0px; padding:0px;\" bgcolor=\"#f4f4a4\">\n    <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#f4f4f4\"> <tr  >\n        <td align=\"center\" valign=\"top\"  bgcolor=\"#f4f4f4\" >\n          <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\"  align=\"center\" class=\"em_main_table\" style=\"table-layout:fixed;\">\n<tr>\n              <td height=\"40\" class=\"em_height\">&nbsp;</td>\n            </tr>\n            <tr>\n              <td align=\"center\"><a href=\"https://www.prosequennce.tech\" target=\"_blank\" style=\" text-decoration:none;font-size:40px;\">pro-sequence</a></td>\n            </tr>\n            <tr>\n              <td height=\"30\" class=\"em_height\">&nbsp;</td>\n            </tr>\n            <tr>\n              <td height=\"14\" style=\"font-size:1px; line-height:1px;\">&nbsp;</td>\n            </tr>\n            <tr>\n              <td align=\"center\" style=\"font-family:'Open Sans', Arial, sans-serif; font-size:15px; line-height:18px; color:#30373b; text-transform:uppercase; font-weight:bold;\" class=\"em_font\">\n                <button target=\"_blank\" style=\"text-decoration:none;\"><a  href=\"https://www.pro-sequence.tech/Tutorial/Java/Introduction\">Java Tutorial</a></button> &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; <button target=\"_blank\" style=\"text-decoration:none;\"><a href=\"https://www.pro-sequence.tech/Tutorial/C/Introduction\">C Tutorial</a></button>\n              </td>\n            </tr>\n            <tr>\n              <td height=\"14\" style=\"font-size:1px; line-height:1px;\">&nbsp;</td>\n            </tr>\n            <tr>\n              <td  style=\"font-size:20px; color: rgb(102, 102, 102);\"><br/>Today's Question<hr/></td>\n            </tr>\n            <tr>\n              <td height=\"2\"  style=\"font-size:35px; color: #02183d;\"><br/><strong>"+QuestionTitle+"</strong></td>\n            </tr>\n            <tr>\n              <td valign=\"top\" class=\"em_aside\">\n                <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n                  <tr>\n                    <td height=\"36\" class=\"em_height\">&nbsp;</td>\n                  </tr>\n                  <tr>\n                    <td style=\"background-color: #f4f4f4;\"><pre style=\"white-space: pre-wrap; font-size: 25px;font-family: 'Open Sans';\">\n"+Question+"\n</pre></td>\n                  </tr>\n          \n                  <tr>\n                    <td align=\"center\" style=\"font-family:'Open Sans', Arial, sans-serif; font-size:18px; font-weight:bold; line-height:20px; color:#003591;\"><hr/>Consistency is the key!</td>\n                  </tr>\n                  <tr>\n                    <td height=\"20\" style=\"font-size:1px; line-height:1px;\">&nbsp;</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\" style=\"font-family:'Open Sans', Arial, sans-serif; font-size:18px; line-height:20px; color:#003591;\">Solve a coding question daily</td>\n                  </tr>\n                  <tr>\n                    <td height=\"12\" style=\"font-size:1px; line-height:1px;\">&nbsp;</td>\n                  </tr>\n                  <tr>\n                    <td valign=\"top\" align=\"center\">\n                      <table width=\"210\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n                        <tr>\n                          <td valign=\"middle\" align=\"center\" height=\"45\" bgcolor=\"#74a4f7\" style=\"font-family:'Open Sans', Arial, sans-serif; font-size:20px; font-weight:bold; color:#ffffff; text-transform:uppercase;\"><a style =\"color:#ffffff;\" href =\"https://www.pro-sequence.tech/LeetCode/"+QuestionTitle+"\">Solution</a></td>\n                        </tr>\n                      </table>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td height=\"34\" class=\"em_height\">&nbsp;</td>\n                  </tr>\n                  <tr>\n                    <td align=\"center\" style=\"font-family:'Open Sans', Arial, sans-serif; font-size:15px; line-height:22px;\"><b>Best time to start is Today!</b><br/>\n                      <br/>\n                      <button ><a  href = \"https://www.pro-sequence.tech/Tutorial\">Language Tutorials.</a></button><br/><br/>\n                      <button ><a href=\"https://www.pro-sequence.tech/Placement\">Prepare for interview questions</a></button><br />\n                    </td>\n                  </tr>\n                  <tr>\n                    <td height=\"31\" class=\"em_height\">&nbsp;</td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n   \n          </table>\n        </td>\n      </tr>\n\n      <tr>\n        <td align=\"center\" valign=\"top\"  bgcolor=\"#30373b\" class=\"em_aside\">\n          <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"em_main_table\" style=\"table-layout:fixed;\">\n            <tr>\n              <td height=\"35\" class=\"em_height\">&nbsp;</td>\n            </tr>\n            <tr>\n              <td valign=\"top\" align=\"center\">\n                <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n                  <tr>\n                    <td valign=\"top\"><a href=\"https://www.linkedin.com/company/76160368\" target=\"_blank\" style=\"text-decoration:none; color: #74a4f7;\">Follow us on LinkedIn</a></td>\n                    <td width=\"7\">&nbsp;</td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n            <tr>\n              <td height=\"22\" class=\"em_height\">&nbsp;</td>\n            </tr>\n            \n            <tr>\n              <td height=\"10\" style=\"font-size:1px; line-height:1px;\">&nbsp;</td>\n            </tr>\n            <tr>\n              <td align=\"center\" style=\"font-family:'Open Sans', Arial, sans-serif; font-size:12px; line-height:18px; color:#848789;text-transform:uppercase;\">\n                If you do not wish to receive any further emails from us, please  <span style=\"text-decoration:underline;\"><a href=\"https://www.pro-sequence.tech/unsubscribe/"+unsubs+"\" target=\"_blank\" style=\"text-decoration:underline; color:#848789;\">unsubscribe</a></span>\n              </td>\n            </tr>\n            <tr>\n              <td height=\"35\" class=\"em_height\">&nbsp;</td>\n            </tr>\n          </table>\n        </td>\n      </tr>\n    </table>\n    <div style=\"display:none; white-space:nowrap; font:20px courier; color:#ffffff; background-color:#ffffff;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>\n  </body>\n</html>"
//             var data = {
//                 from: 'Coding@pro-sequence.tech',
//                 to: Email,
//                 subject: 'Today\'s Question' +" "+ QuestionTitle,
//                 html: htmlCode,
              
//               };
            
//               mailgun.messages().send(data, function (error, body) {
//                 console.log(body);
// });
              
        
//         }


//     }
//     getdata();
//     }, {
//         scheduled: true,
//         timezone: "Asia/Calcutta"
//       })
    


app.prepare().then(() => {
    const server = express();
    server.use(bodyparser.json());
    server.use(express.static('public'))
    server.use(express.static('static'))
    server.use(compression());


    //uncomment before deployment

    // server.enable('trust proxy')
    // server.use(function(request, response, next) {

    //     if (process.env.NODE_ENV != 'development' && !request.secure) {
    //     return response.redirect("https://" + request.headers.host + request.url);
    //     }

    //     next();
    // })

    // server.all(/.*/, function(req, res, next) {
    //     var host = req.header("host");
    //     if (host.match(/^www\..*/i)) {
    //         next();
    //     } else {
    //         res.redirect(301, "https://www." + host);
    //     }
    // });



    server.get("/runCodeForces", function(req, res){
        CodeForcesQuestion();
        const parseIp = (req) =>
    req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress

        console.log("IP ---- " , parseIp(req))
        res.sendStatus(200)
    })

    server.get("/Update", function(req, res){
        cache = {}

        res.sendStatus(200)
    })

    

    server.get("/unsubscribe/:id/:email", function(req, res){
        const _id = req.params["id"];

        const removeEmail = async()=>{
            const data = await emailmodal.deleteOne({_id});


        }
        removeEmail()
        res.sendStatus(200);

    })

    server.get("/getCodeExampleSubjects", function(req, res){
        const run = async() => {
            const getSubjects = await codesExamplesModel.find().select({
                "Subject": 1
            })

            res.json({
                Subjects: getSubjects
            })
        }

        run()
    })

    server.get("/getCodeExampleQuestionTitle/:subject", function(req, res){
        const subject = req.params["subject"];

        const run = async()=>{
            const getAllQuestions = await codesExamplesModel.find({Subject: subject}).select({
                Questions: {
                    "Title": 1,
                    "Link": 1
                }

            })

            res.json({
                "data": getAllQuestions
            })
        }

        run();

    })

    server.post("/getCodeExampleAnswer", urlencodedParser, function(req, res){
        const subject = req.body["Subject"]
        const questionLink = req.body["QuestionLink"]
        
        const run = async() =>{
            const getAnswer = await codesExamplesModel.find({Subject: subject},{ Questions: {$elemMatch: {Link: questionLink}}});
            res.json({
                "getAnswer": getAnswer
            })
        }
        run();
    })


    server.post("/addCodingSubject",urlencodedParser,  function(req, res){
        const subject = req.body["Subject"]
        
        const data = {
            "Subject": subject,
            "Questions": []
        }

        const run = async()=>{
            const addData = new codesExamplesModel(data);
            const result = await codesExamplesModel.insertMany([addData]);
            res.sendStatus(200);
        }

        run();

    })

    //The Tutorial API
    server.get("/APItutorialSubjects", function(req, res){
        if(cache["TutorialSubjects"] !== undefined){

            res.json({
                subjects: cache["TutorialSubjects"]
            })
        }
        else{
            const check = async ()=>{
                const getAllSubjects = await tutorialModal.find().select({
                    Subject: 1
                });

                cache["TutorialSubjects"] = getAllSubjects

                res.json({
                    subjects: getAllSubjects
                })
                
    
            }
    
            check()
        }


    })

    server.post("/APItutorialAnswer", urlencodedParser, function (req, res){
        const subject = req.body["subject"]
        const question = req.body["Question"]
        

        if(cache[subject +question+ "tutorial"] !== undefined){
            console.log("retrived from cache")
            const getQuestions = async () =>{
                const sizeOfArray = await tutorialModal.find({Subject: subject}).select({
                    Questions: {
                        Question : 1
                    }
                })

                res.json({
                    answer: cache[subject +question+ "tutorial"]["Answer"],
                    MetaKeyword: cache[subject +question+ "tutorial"]["MetaKeyword"],
                    MetaDescription: cache[subject +question+ "tutorial"]["MetaDescription"],
                    Questions: sizeOfArray[0]["Questions"],
                    Author: cache[subject +question+ "tutorial"]["Author"],
                    Author_URL: cache[subject +question+ "tutorial"]["Author_URL"]
    
                })

            }

            getQuestions();
        


        }
        else{
            const check = async ()=>{
                const getAnswer = await tutorialModal.find({Subject: subject},{ Questions: {$elemMatch: {Question: question}}});
            
                const sizeOfArray = await tutorialModal.find({Subject: subject}).select({
                    Questions: {
                        Question : 1
                    },
                    Author: 1,
                    Author_URL: 1
                })
            
                if(getAnswer[0]["Questions"].length === 0){
                      
                res.json({
                    answer: 0,
                    MetaKeyword: 0,
                    MetaDescription: 0,
                    Questions: 0,
                    Author: 0,
                    Author_URL: 0
    
                })
                }
                else{

               
                    cache[subject +question+ "tutorial"] = {
                        Answer: getAnswer[0]["Questions"][0]["Answer"],
                        MetaKeyword: getAnswer[0]["Questions"][0]["MetaKeyword"],
                        MetaDescription: getAnswer[0]["Questions"][0]["MetaDescription"],
                        Author: sizeOfArray[0]["Author"],
                        Author_URL: sizeOfArray[0]["Author_URL"]
        
                    }

                      
                res.json({
                    answer: getAnswer[0]["Questions"][0]["Answer"],
                    MetaKeyword: getAnswer[0]["Questions"][0]["MetaKeyword"],
                    MetaDescription: getAnswer[0]["Questions"][0]["MetaDescription"],
                    Questions: sizeOfArray[0]["Questions"],
                    Author: sizeOfArray[0]["Author"],
                    Author_URL: sizeOfArray[0]["Author_URL"]
    
                })
                }
    
            }
            
    
            check();
    


        }



    })


    server.get("/APIplacementSubjects", function(req, res){
        const check = async ()=>{
            const getAllSubjects = await placementModal.find().select({
                Subject: 1
            })

            res.json({
                subjects: getAllSubjects
            })
        }
        check()
    })

    server.post("/APIplacementAnswer", urlencodedParser, function (req, res){
        const subject = req.body["subject"]
        const question = req.body["Question"]

        if (cache[subject + question + "placement"] !== undefined){
            res.json({
                answer: cache[subject + question + "placement"]
            })
        }
        else{

        const check = async ()=>{
            const getAnswer = await placementModal.find({Subject: subject},{ Questions: {$elemMatch: {Question: question}}});

            if(getAnswer[0]["Questions"].length === 0){
                res.json({
                    answer: 0
                })
            }
            else{
                cache[subject + question + "placement"] = getAnswer[0]["Questions"][0]["Answer"]
                res.json({
                answer: getAnswer[0]["Questions"][0]["Answer"]
            })
            }
            
        }

        check();


        }



    })


    server.post("/APIplacement",urlencodedParser, function (req, res){
        const subject = req.body["subject"]

        if(cache["APIplacement" + subject]  === undefined){

            const check = async () =>{

            const sizeOfArray = await placementModal.find({Subject: subject}).select({
                Questions: {
                    Question : 1
                }
            })
            cache["APIplacement" + subject] = sizeOfArray[0]["Questions"]

            res.json({
                getting: sizeOfArray[0]["Questions"],
            })

        }
        check();

        }
        else{
            res.json({
                getting: cache["APIplacement" + subject],
            })
        }

    })


    server.post("/addData", urlencodedParser, function (req, res){
        const testdata = {
            platform: req.body["platform"],
            QuestionTitle: req.body["QuestionTitle"],
            Question: req.body["Question"],
            Solution: req.body["Solution"],
            Views: 0,
            MetaTags: req.body["MetaTags"],
            MetaDescription: req.body["MetaDescription"]

        }

        const currentDate = new Date();
        const month = currentDate.getMonth() + 1
        const date = currentDate.getDate()
        const year = currentDate.getFullYear()
        const constructedDate = date + "/" +month +"/" + year;

        const QuestionTrackerData = {
            Date: constructedDate,
            Platform : testdata["platform"],
            QuestionTitle : testdata["QuestionTitle"]
        }



        const createDocument = async () => {
            // async and await function to wait till the data is successfully stored or not
            //Try and catch to catch an error while inserting data
            try{
                const question = await modal.find({platform: testdata["platform"] , QuestionTitle:req.body["QuestionTitle"]})
                //user Creating a new JSON object as defined on schema
      
                if(question.length === 0){
                    const user = new modal(testdata)
                    const newQuestionTracker = new QuestionTrackerModel(QuestionTrackerData)

                    const result = await modal.insertMany([user]);  //INSERT
                    const addQuestionTracker = await QuestionTrackerModel.insertMany([newQuestionTracker]) //Add tracker

                    console.log("added");
                    res.sendStatus(200);

                }
                else{
                    res.sendStatus(409)
                }
     

            }
            catch (error){
                console.log("error" , error);
            
            }
        }

        createDocument()


    })




    server.post("/Email", urlencodedParser, function (req, res){
        const addEmail = async() =>{
            const data = {
                Email: req.body["Email"],
                From: "Website"
            }

            const checkdata = await emailmodal.find({Email: req.body["Email"]})


            if(checkdata.length === 0){

                const email = new emailmodal(data);

                const result = await emailmodal.insertMany([email]);
                console.log(result);
            }

            res.sendStatus(200)


        }

        addEmail();



    })

    server.get("/randomQuestion", urlencodedParser, function (req, res){

        const getrandom = async () =>{

            const randomNumber = Math.floor(Math.random() * 15)
            const secondrandom = Math.floor(Math.random() * 16)

            const data = await modal.find().select({
                QuestionTitle: 1,
                Views: 1,
                platform: 1
            }).limit(4).skip(randomNumber * secondrandom);

            res.json({
                randomData :data
            });


        }
        getrandom();



    })


    server.post("/questionList",urlencodedParser, function(req, res){


        const platform = req.body["platform"];
        const count = req.body["count"];




        const getdata = async () =>{
            const QuestionsList = await modal.find({platform: platform}).select({
                QuestionTitle: 1,
                Views: 1,
                platform: 1
            }).limit(10).skip(10 * count);

            const gettotal = await modal.find({platform: platform}).count();


            res.json({
                getting : QuestionsList,
                total: gettotal
            })


        }
        getdata();


    })


    server.post("/AddCodeExample", urlencodedParser, function(req, res){
        const data = req.body["apiData"];
        //console.log("fetchedData" , data)
        const newData = {
        "Title": data["Title"],
          "Link": data["Link"],
          "Views": 0,
          "Content": data["Content"]

        }

        const addData = async()=>{
            await codesExamplesModel.findOneAndUpdate(
                {"Subject": data["Subject"]},
                {$push: {"Questions": newData}},
                { upsert: true }
                )

            res.sendStatus(200);
        }
        

        addData();
    })


    server.post("/question", urlencodedParser, function(req, res){



        const quesiontitlle = req.body["questiontitle"];
        const platform = req.body["platform"]



        const getdata = async () =>{
            const leetcode_question = await modal.find({platform: platform , QuestionTitle: quesiontitlle}).select({
                Question: 1,
                Views: 1,
                Solution: 1,
                MetaTags: 1

            });
            if(leetcode_question.length !== 0){

                var _id = leetcode_question[0]["_id"];

                var views = leetcode_question[0]["Views"];

                const result = await modal.updateOne({_id},{
                    $set :{
                        Views: views +1
                    }
                });

                
                res.json({
                    getting : leetcode_question
                })
              


            }
            else{
                
                res.json({
                    "getting" : []
                });
                //res.redirect("/404");

            }


           

        }
        getdata();

    })



    //API to track the added data
    server.get("/QuestionTracker/:Date/:Month/:Year", (req, res) =>{
        const Date = req.params["Date"];
        const Month = req.params["Month"];
        const Year = req.params["Year"];

        const date = Date + "/" + Month + "/" + Year;
        
            const queryDataWithDate = async ()=>{
                const data = await QuestionTrackerModel.find({Date: date})
                var htmlCode = CreateHtmlTemplate(data);

                res.send(htmlCode)
            }
            queryDataWithDate();
    })

    
    server.get("/QuestionTracker", (req, res) =>{
        
        const queryDataWithoutDate = async ()=>{
            const data = await QuestionTrackerModel.find()
            var htmlCode = CreateHtmlTemplate(data);

            res.send(htmlCode);
        }

        queryDataWithoutDate();
    })


    server.get("/AddData", (req, res)=>{
        app.render(req, res, "/AddData"); 
    });

    server.get("/CodeForces", (req, res) => {
        app.render(req, res, "/CodeForces");
    });

    server.get("/LeetCode", (req, res) => {
        app.render(req, res, "/LeetCode");
    });

    server.get("/404", (req,res) =>{

        app.render(req,  res, "/404");
    })

    
    server.get("/Tutorial", (req, res) => {
        app.render(req, res, "/Tutorial");
    });


    server.get("/CodeChef", (req, res) => {
        app.render(req, res, "/CodeChef");
    });
    server.get("/Codes", (req, res) => {
        app.render(req, res, "/Codes");
    });

    server.get("/HackerEarth", (req, res) => {
        app.render(req, res, "/HackerEarth");
    });


    server.get("/Placement", (req, res) => {
        app.render(req, res, "/Placement");
    });

    server.get("/Codes/:subject", (req, res) => {
        app.render(req, res, "/Codes/" + req.params["subject"]);
    });

    server.get("/Placement/:subject", (req, res) => {
        app.render(req, res, "/Placement/" + req.params["subject"]);
    });
    server.get("/Placement/:subject/:Question", (req, res) => {
        app.render(req, res, "/Placement/" + req.params["subject"] + "/" + req.params["Question"]);
    });

    server.get("/CodeForces/:ids", (req, res) => {
        app.render(req, res, "/CodeForces/" + req.params["ids"]);
    });

    server.get("/LeetCode/:ids", (req, res) => {
        app.render(req, res, "/LeetCode/" + req.params["ids"]);
    });

    server.get("/CodeChef/:ids", (req, res) => {

        app.render(req, res, "/CodeChef/" + req.params["ids"]);
    });

    server.get("/Tutorial/:subject", (req, res)=>{
        res.redirect("/Tutorial/" + req.params["subject"] + "/" + "Introduction")
    })

    server.get("/Tutorial/:subject/:Question", (req, res) => {
        app.render(req, res, "/Tutorial/" +req.params["subject"]+"/"+ req.params["Question"]);
    });

    server.get("/HackerEarth/:ids", (req, res) => {
        app.render(req, res, "/HackerEarth/" + req.params["ids"]);
    });

    // server.get("/robots.txt", (req, res)=>{
    //     res.sendFile(path.join(__dirname, "static", "robots.txt"));

    // })
    // server.get("/sitemap.xml", (req, res)=>{
    //     res.sendFile(path.join(__dirname, "static", "sitemap.xml"));

    // })
    // server.get("/LeetCode.xml", (req, res)=>{
    //     res.sendFile(path.join(__dirname, "static", "LeetCode.xml"));

    // })
    // server.get("/CodeChef.xml", (req, res)=>{
    //     res.sendFile(path.join(__dirname, "static", "CodeChef.xml"));

    // })

    // server.get("/JavaTutorial.xml", (req, res)=>{
    //     res.sendFile(path.join(__dirname, "static", "JavaTutorial.xml"));

    // })

    // server.get("/CodeForces.xml", (req, res)=>{
    //     res.sendFile(path.join(__dirname, "static", "CodeForces.xml"));

    // })
    // server.get("/HackerEarth.xml", (req, res)=>{
    //     res.sendFile(path.join(__dirname, "static", "HackerEarth.xml"));

    // })
    // server.get("/Operating-System.xml", (req, res)=>{
    //     res.sendFile(path.join(__dirname, "static", "Operating-System.xml"));

    // })
    // server.get("/ReactJs.xml", (req, res)=>{
    //     res.sendFile(path.join(__dirname, "static", "ReactJs.xml"));

    // })

    // server.get("/loaderio-8e5dfa652aa16aa4b372124d284d8b6b.txt", (req, res)=>{
    //     res.sendFile(path.join(__dirname, "static", "loaderio-8e5dfa652aa16aa4b372124d284d8b6b.txt"));

    // })

    //Trigger the 404 page
    server.get("*", (req, res) => {
        app.render(req, res, "/");
    });


    server.listen(PORT, err =>{
        if(err) throw err;
        console.log("Listenting on port" + PORT);


    });


})