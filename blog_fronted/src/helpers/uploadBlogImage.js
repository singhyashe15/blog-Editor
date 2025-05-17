const url = import.meta.env.VITE_CLOUDINARY_CLOUD_URL

const uploadFile = async(file)=>{
    const formData = new FormData()
    formData.append('file',file)
    formData.append("upload_preset","kqxmnmum") 

    const response = await fetch(url,{
        method : 'POST',
        body : formData
    })
    const responseData = await response.json()
    return responseData
}

export default uploadFile