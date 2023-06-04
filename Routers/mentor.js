import express from "express"
import { addMentorsData, deleteMentor, getAllMentors, getMentorsById, updateMentor } from "../Controllers/mentor.js"

const router = express.Router()
//CRUD- READ
//a.get the mentors data
router.get("/all",async (req, res)=>{
    try {
        if(req.query.experience){
            req.query.experience = +req.query.experience
        }
        if(req.query.taskCompletion){
            req.query.taskCompletion = +req.query.taskCompletion
        }
        const mentors = await getAllMentors(req)
        //console.log(mentors)
        if(mentors.length <=0){
            res.status(400).json({data:"invalid data"})
            return
        }
        res.status(200).json({data:mentors})
    } catch (error) {
        res.status(500).json({data:"Internal server error"})
    }
});

//b.get the id based mentors (id params)
router.get("/:id",async (req,res)=>{
    try {
        const {id} = req.params;
    const mentor = await getMentorsById(id);
    if(!mentor){
       return res.status(400).json({data:"user not found"})
    }
    res.status(200).json({data:mentor})
    } catch (error) {
        res.status(400).json({data:"Internal server error"})
    }
    
})

//2.CRUD- Create
//Add or Create the data

router.post("/add",async (req, res)=>{
    try {
        const addMentor= req.body;
        if(!addMentor){
           return res.status(400).json({data:"No details provided"})
        }
        const result = await addMentorsData(addMentor)
        res.status(200).json({data:{result:result,message:"data added successfully"}})
    } catch (error) {
        res.status(400).json({data:'Internal server error'})
    }
})

//3.CRUD- Update
//Update the exist data

router.put("/edit/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const editMentor = req.body;
        if(!id||!editMentor){
            return res.status(400).json({data:"No details provided"})
        }
        const result = await updateMentor(id,editMentor);
        res.status(200).json({data:{result:result,message:"update successfully"}})
    } catch (error) {
        res.status(400).json({data:'Internal server error'})
    }
})

//4.CRUD-Delete
//Delete the exist data

router.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({data:"invalid details"})
        }
        const result = await deleteMentor(id)
        res.status(200).json({data:{result:result,message:"deleted successfully"}})
    } catch (error) {
        res.status(400).json({data:'Internal server error'})
    }
})

export const mentorRouter = router
