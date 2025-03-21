import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    questionId:{
        type:String,
        required:true
    },
    answer:{
        type:String,
    },
    isCorrect:{
        type:Boolean,
        default:false
    },
    submittedAt:{
        type:Date,
        default:Date.now()
    }
});

const Submission = mongoose.models.Submission || mongoose.model("Submission", submissionSchema);

export default Submission;

