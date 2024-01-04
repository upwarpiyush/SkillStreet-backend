//import the model
const Note = require("../models/Note");

//define route handler

exports.updateNote = async(req,res) => {
    try {
        const {id} = req.params;
        const {title, content} = req.body;

        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({
            success: false,
            message: "Invalid ID format",
            });
        }

        if (!title || !content) {
            return res.status(400).json({
              success: false,
              message: 'Title and content are required fields.',
            });
        }

        const maxTitleLength = 50;
        const maxContentLength = 250;

        if (title.length > maxTitleLength || content.length > maxContentLength) {
        return res.status(400).json({
            success: false,
            message: `Title must be at most ${maxTitleLength} characters, and content must be at most ${maxContentLength} characters.`,
        });
        }

        const existingNote = await Note.findById(id);

        if (!existingNote) {
        return res.status(404).json({
            success: false,
            message: "No Data Found with Given Id",
        });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            {_id:id},
            {title, content, updatedAt: Date.now()},
            { new: true }
        )

        res.status(200).json({
            success:true,
            data:updatedNote,
            message: `Updated Successfully`,
        })
            
    }
    catch(err) {
        console.error(err);
        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }
        res.status(500).json({
            success:false,
            error:err.message,
            message:'Server Error',
        });
    }
}
