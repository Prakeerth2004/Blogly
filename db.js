import mongoose from 'mongoose'; 

export const connect=async()=>{
try{
    const conn=await mongoose.connect(process.env.uri); 
    console.log(`MongoDB connected ${conn.connection.host}`)
}
catch(error){
console.log(error)
process.exit(1);

}

}