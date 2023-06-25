import  {MongoClient} from "mongodb";
import 'dotenv/config';


export default class DB{
    constructor(Mongosh,Atlas){
        // this.connectionString=process.env.MONGOSH || "";
        this.clientLocal=new MongoClient(Mongosh,{serverSelectionTimeoutMS:100});
        this.clientAtlas=new MongoClient(Atlas)

        //code to mysql here
        }
     
    //this method validate the conection of databases
    connectionDBS=async ()=>{
        let dbs={}

        // console.time('connect')
        //check if there is  connection to Monogosh
        // try {
        //     let conn=await this.clientLocal.connect()
        //     console.timeEnd('connect')
        //     dbs['mongosh']= conn.db('cinema');  
        // } catch (error) {
        //     console.log("there is any error with mongosh: ",error)
        //     console.timeEnd('connect')
        //     dbs['mongosh']= null
        // }

        dbs['mongosh']= null

        //check if there is connection to Atlas
        try{
            let conn=await this.clientAtlas.connect()
            dbs['atlas']= conn.db('cinema');
        }catch(error){
            console.log("there is any error with atlas: ",error)
            dbs['atlas']=null
        }

        return dbs;

    }

    validateQuery= async (db,collec,command,codition=null)=>{
        if(db.mongosh != null && db.atlas != null){
          return {
            'resultMongosh': await this.query(db.atlas,collec,command,codition),
            'resultAtlas':await this.query(db.mongosh,collec,command,codition),
            'error':null
          } 
        }else if(db.mongosh != null){
            return {
                'resultMongosh': await this.query(db.mongosh,collec,command,codition),
                'resultAtlas':null,
                'error':null
            } 

        }else if(db.atlas != null){
            return {
                'resultMongosh': null,
                'resultAtlas':await this.query(db.atlas,collec,command,codition),
                'error':null
              } 
        }

        return {"error":"error 500"}
    }


    query=async (db,collec,command,codition)=>{
       if(command=="find"){
         let coleccion = await db.collection(collec)
         let result= await coleccion[command]({})
          return result.toArray();
       }

       return ''
    }


    //method to crud in the databases
    get= async (collec)=>{
       let dbs= await this.connectionDBS();
       let result= await this.validateQuery(dbs,collec,'find');

       if(result['resultMongosh'] != null)
           return result['resultMongosh']
        else if ( result['resultAtlas'] != null)
           return result['resultAtlas']
        
       return result['error'];
    }

}