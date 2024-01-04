//import th model
const Note = require("../models/Note");

//define route handler

exports.getNote = async(req,res) => {
    try {
            //fetch all notes from database
            const notes = await Note.find({});

            //response
            res.status(200)
            .json({
                success:true,
                data:notes,
                message:"All Notes is fetched",
            });
    }
    catch(err) {
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'Server Error',
        });
       
    }
}


exports.getNoteById = async(req, res) => {
    try {
       //extract todo items basis on id
       const id = req.params.id;

       if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({
            success: false,
            message: "Invalid ID format",
            });
        }

       const note = await Note.findById( {_id: id})

       //data for given id not found
       if(!note) {
        return res.status(404).json({
            success:false,
            message:"No Data Found with Given Id",
        })
       }
       //data for given id FOUND
       res.status(200).json({
        success:true,
        data:note,
        message: `Note ${id} data successfully fetched`,
       })

    }
    catch(err) {
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'Server Error',
        });
    
    }
}
