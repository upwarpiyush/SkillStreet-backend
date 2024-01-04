//import th model
const Note = require("../models/Note");

//define route handler

exports.createNote = async(req,res) => {
    try {
            //extract title and desxcription from reauest body
            const {title,content} = req.body;

            // Validate that title and content are provided
            if (!title || !content) {
                return res.status(400).json({
                success: false,
                message: 'Title and content are required fields.',
                });
            }

            // Validate title and content lengths
            const maxTitleLength = 50;
            const maxContentLength = 250;

            if (title.length > maxTitleLength || content.length > maxContentLength) {
            return res.status(400).json({
                success: false,
                message: `Title must be at most ${maxTitleLength} characters, and content must be at most ${maxContentLength} characters.`,
            });
            }

            //create a new Todo Obj and insert in DB
            const response = await Note.create({title,content});
            //send a json response with a success flag
            res.status(200).json(
                {
                    success:true,
                    data:response,
                    message:'Entry Created Successfully'
                }
            );
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}
