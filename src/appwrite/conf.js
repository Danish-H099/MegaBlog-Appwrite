import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    database;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        }
        catch(error){
            throw error;
        }
    }
    // what is this slug? It is a unique identifier for each post. We use it to identify the post when we want to update or delete it.
    // who provide the slug? The user provides the slug when they create the post. The slug is the URL-friendly version of the post title.

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        }
        catch(error){
            throw error;
        }
    }

    async deletePost(slug){
        try{
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        }
        catch(error){
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        }
        catch(error){
            throw error;
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            );
        }
        catch(error){
            throw error;
            return false;
        }
    }

    //file uplaod Servie

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            );
        }
        catch(error){
            throw error;
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId,
            );
            return true;
        }
        catch(error){
            throw error;
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }
}




const service = new Service();
export default service;