import { ObjectId, client } from "../db.js";

export function getAllMentors(req){
    return client 
    .db('guvi')
    .collection('mentors')
    .find(req.query)
    .toArray();
}

export function getMentorsById(id){
    return client 
    .db("guvi")
    .collection("mentors")
    .findOne({_id: new ObjectId(id)});
}

export function addMentorsData(data){
    return client
    .db("guvi")
    .collection("mentors")
    .insertOne(data)
}

export function updateMentor(id,updateData){
    return client
    .db("guvi")
    .collection("mentors")
    .findOneAndUpdate({_id: new ObjectId(id)},{$set:updateData})
}

export function deleteMentor(id){
    return client 
    .db("guvi")
    .collection("mentors")
    .deleteOne({_id:new ObjectId(id)})
}