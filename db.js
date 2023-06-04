import { MongoClient } from "mongodb";
import Obj from "mongodb"
//1.create the url
const MongoURL = "mongodb+srv://prasath:prasath123@cluster0.fsxvn0q.mongodb.net/?retryWrites=true&w=majority"
async function createConnection(){
    //2.create the connection
    const client = new MongoClient(MongoURL);
    //3.connect the url
    await client.connect()
    console.log("MongoDB is connected successfully")
    return client
}
export var ObjectId = Obj.ObjectId;
export const client = await createConnection();