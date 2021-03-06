export const upload = (theFile, publicURL, existingImage = null, fileName = null) =>{
    var formData  = new FormData();

    formData.append('file_upload', theFile, fileName|| theFile.name); //This is the raw file that was selected
    
    const url = !!existingImage ? existingImage.url : null;
    const endPoint = !!existingImage ? `/api/fileupload/${existingImage._id}/update` : '/api/fileupload/create';

    return new Promise((resolve, reject)=>{
        fetch(publicURL + endPoint, {
            method: !!existingImage ? "PUT" : 'POST',
            credentials: 'include',
            body: formData
        })
        .then(response =>{
            // if the response is a JSON object
            return response.json(); 
        })
        .then(result => {
            if(result.error){
                console.log(result)
                reject("Image could not be uploaded")
            }else{
                resolve({ data: { link: result.url}})
            }
        })
        .catch(error => {
            console.log(error)
            reject("Image could not be uploaded")
        });
    })
  
}