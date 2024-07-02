import client from "./baseApiClient";
export const getRecepientById=(input:any)=>{ 
return client.post(`document/getreceptient`,
{...input}    
);
}
export const addRecepient=(input:any)=>{
   return client.post(`/document/addreceptient`,{
    ...input
   }) 
}
export const deleteRecepientById=(id:number)=>{
    return client.delete(`/document/deleteRecepient/${id}`);
}
