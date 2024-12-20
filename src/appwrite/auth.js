import config from "../config/config";
import { Client, Account, ID } from "appwrite";

// We create this class to prevent vendor lock-in. If we ever decide to switch from Appwrite to another service, we can simply replace this class with another one that has the same methods.
export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({email, password});
            }else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }
    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch(error){
            throw error;
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }
    async logout(){
        try{
            return await this.account.deleteSession("current");
        }
        catch(error){
            console.log("Appwrite service :: logout :: error", error);
        }
    }

}

const authService = new AuthService();

export default authService;

// Your application will import authService object and can access the methods like authService.login(), authService.logout(), etc. This way, you can easily switch to another service in the future without changing the rest of your application.