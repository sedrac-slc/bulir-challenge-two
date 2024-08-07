import { LocalStorage } from "../util/LocalStorage";

export default class AbstractApi{
    
  protected BASE_URL: string = "https://bulir-challenge-one-production.up.railway.app/api/v1";

   public baseUrl(): string{
        return this.BASE_URL;
   }

   protected getHeaders(){
     return {
         headers: {
             'Content-Type': 'application/json',
             'authorization': LocalStorage.getItemToken()
         }
     }
 }

}