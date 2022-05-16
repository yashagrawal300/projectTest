const prosequence = {
    platform: {
        type: String,
        required: true
    },
    QuestionTitle: {
        type: String,
        required: true
    },
    Question: {
        type: String,
        required: true
    },
    Solution: {
        type: String,
        required: true
    },
    Views:{
        type: "Number",
        required: true
    },
    MetaTags: {
        type: String,
        required: true
    },
    MetaDescription: {
        type: String,
        required: true
    }
}


const emailSchema = {
    Email: {
        type: "String",
        required: true
    },
    From: {
        type: "String",
        required: true
    }
}


const placementSchema = {
        Subject: {
            type: String,
            required: true

        },

        Questions:
            [
                {
                    Question: {
                        type: "String",
                        required : true
                    },
                    Answer: {
                        type: "String",
                        required: true
                    }
                }
            ]
    }


const tutorialSchema = {
        Subject: {
            type: String,
            required: true

        },
        Author: {
            type:String
        },
        Author_URL: {
            type:String
        },
        Questions:
            [
                {
                    Question: {
                        type: "String",
                        required : true
                    },
                    Answer: {
                        type: "String",
                        required: true
                    },
                    MetaKeyword: {
                        type: String,
                        required: true
                    },
                    MetaDescription:{
                        type: String,
                        required: true
                    }
                }
            ]
    }


const QuestionTracker = {
        Date: {
            type: String,
            required: true

        },
        Platform: {
            type: String,
            required: true
        },

        QuestionTitle:{
            type:String,
            required: true
        }
    }

const codeGreppherContent = {
    "Title": {
        type: String,
    },
    "Code":{
        type: String,
        required: true
    },
    "SourceName":{
        type: String
    },
    "SourceLink":{
        type: String
    }

}

const codeGreppher = {
    "Subject":{
        type: String,
        "required": true
    },

    "Questions":[
        {
        "Title":{
        type: String,
        required: true
    },
    "Link":{
        type: String,
        required: true
    },
    "Views":{
        type: Number,
        required: true
    },
    "Content": [codeGreppherContent]
    }]
    
}


module.exports = {
    prosequence: prosequence,
    emailSchema: emailSchema,
    QuestionTracker: QuestionTracker,
    tutorialSchema: tutorialSchema,
    placementSchema: placementSchema,
    codeGreppher: codeGreppher
}