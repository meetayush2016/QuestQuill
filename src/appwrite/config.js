import conf from '../conf/conf.js';
import { Client, ID , Databases , Storage , Query } from "appwrite";

export class Service{
    client = new Client(); 
    databases; 
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId); 
        this.databases = new Databases(this.client) 
        this.bucket = new Storage(this.client)
    }
    async createPost({title , slug , content , featuredImage , status , userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabseId, 
                conf.appwriteCollectioId, 
                slug,
                {
                    title,
                    content, 
                    featuredImage, 
                    status, 
                    userId, 
                }
            )

        }catch(error){
            console.log("Appwrite service :: creatPost :: error", error)
        }
    } 
    async updatePost({title , slug , content , featuredImage , status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabseId, 
                conf.appwriteCollectioId, 
                slug,
                {
                    title, 
                    content,
                    featuredImage, 
                    status, 
                }
            ); 

        }catch(error){
            console.log("Error  in update function :: Error ::" , error); 
        }
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabseId, 
                conf.appwriteCollectioId,
                slug
            )
            return true

        }catch(error){
            console.log("Error is Appwrite deletePost :: Error :: " , error); 
            return false
        }

    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabseId, 
                conf.appwriteCollectioId, 
                slug
            )


        }catch(error){
            console.log("Error in getPost :: Error ::" , error); 
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf,appwriteDatabseId, 
                conf.appwriteCollectioId,
                queries, 
                         )

        }catch(error){
            console.log("Error in :: getPosts :: error ::",error); 
            return false; 
        }


    }
    //file upload services 
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId , 
                ID.unique(), 
                file

            )

        }catch(error){
            console.log("Appwrite error in upload file :: error " , error); 
            return false; 
        }
    }
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId, 
                fileId
            )
            return true; 

        }catch(error){
            console.log("Appwrite delete file :: error :: ", error); 
        }

    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId, 
            fileId
        )
    }


}

const service = new Service()
export default service