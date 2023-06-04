import express from "express"
import { addStudentsData, deleteStudent, getAllStudents, getStudentsById, updateStudent } from "../Controllers/students.js";

const router = express.Router();

router.get("/all",async (req, res)=>{
    try {
        if(req.query.experience){
            req.query.experience = +req.query.experience
        }
        if(req.query.taskCompletion){
            req.query.taskCompletion = +req.query.taskCompletion
        }
        const students = await getAllStudents(req)
        //console.log(students)
        if(students.length <=0){
            res.status(400).json({data:"User Not Found"})
            return
        } 
        else{
            res.status(200).json({data: students})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server Error"})
    }
})

//get the id based on the id params

router.get("/:id",async (req, res)=>{
    try {
        const {id} = req.params;
        const students = await getStudentsById(id)
        if(!students){
            res.status(400).json({data:"User Not Found"})
        }else{
            res.status(200).json({data:students})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server Error"})   
    }
})

//add or incert the data

router.post("/add",async(req,res)=>{
    try {
   
        const newStudents = req.body;
        
        if(!newStudents){
            
            return res.status(400).json({data:"No details provided"})
        }
        const result = await addStudentsData(newStudents)
        res.status(200).json({data:{result:result, message:"added successfully"}})
        
       
    } catch (error) {
        res.status(400).json({data:"Internal server error"})
    }
   
})

//Edit or Update the students data

router.put("/edit/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const updateData = req.body;
        if(!id || !updateData){
            return res.status(400).json({data:"Wrong Request"})
        }
        const result = await updateStudent(id, updateData)
        res.status(200).json({data:{result:result,message:"Update successfully"}})
    } catch (error) {
        res.status(400).json({data:"Internal server error"})
    }
})

//Delete the student data

router.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
           return res.status(400).json({data:"wrong request"})
        }
        const result = await deleteStudent(id)
        res.status(200).json({data:{results:result, message:"Deleted successfully"}})
    } catch (error) {
        res.status(400).json({data:"Internal server error"})
    }
   
})
export const studentsRouter = router