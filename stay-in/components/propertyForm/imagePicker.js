import React from "react"

class ImagePicker extends React.Component {

    imageUpload = (e) => {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
          localStorage.setItem("recentImage", base64);
          console.debug("file stored",base64);
        });
    };
  
    render() {
      return <input 
       type="file" 
       id="imageFile" 
       name='imageFile' 
       onChange={this.imageUpload} 
       size="lg"
       bg={"blue.400"}
       color={"white"}
       _hover={{
         bg: "blue.500",
       }}/>;
    }

    
  }

  
  const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }

  export default ImagePicker;