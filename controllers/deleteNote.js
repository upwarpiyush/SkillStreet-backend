//import th model
const Note = require("../models/Note");

//define route handler

exports.deleteNote = async(req,res) => {
    try {
        const {id} = req.params;

        // Validate if the provided ID is a valid ObjectId
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({
            success: false,
            message: "Invalid ID format",
            });
        }


        // Check if the note exists before attempting to delete
        const existingNote = await Note.findById(id);
        if (!existingNote) {
        return res.status(404).json({
            success: false,
            message: "No Data Found with Given Id",
        });
        }

        // Delete the note by ID
        await Note.findByIdAndDelete(id);

        res.json({
            success:true,
            message:"Note DELETED",
        })
       
    }
    catch(err) {
        console.error(err);

        // Check for potential errors
        if (err.name === 'CastError') {
            return res.status(400).json({
            success: false,
            message: "Invalid ID format",
            });
        }

        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'Server Error',
        });
    }
}
