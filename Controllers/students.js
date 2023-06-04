
import { ObjectId, client } from "../db.js";

export function getAllStudents(req){
    return client
    .db('guvi')
    .collection('students')
    .find(req.query)
    .toArray();
}

export function getStudentsById(id){
    return client
    .db('guvi')
    .collection('students')
    .findOne({_id: new ObjectId(id)})
}

export function addStudentsData(data){
    return client
    .db('guvi')
    .collection('students')
    .insertOne(data)
}

export function updateStudent(id,updateData){
    return client
    .db('guvi')
    .collection('students')
    .findOneAndUpdate({_id: new ObjectId(id)},{$set:updateData})
} 

export function deleteStudent(id){
    return client
    .db('guvi')
    .collection('students')
    .deleteOne({_id:new ObjectId(id)})
}