import client from "./baseApiClient";
export const getDocumentById=(input:any)=>{ 

return client.post(`/document/getDocument`,
{...input}    
);
}
export const updateDocumentTitle=(input:any)=>{
return client.post(`/document/updateDocumentTitle`,
    {...input}    
    );


}