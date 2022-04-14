import React from "react";
import ReactDOM from "react-dom";
import { Component } from 'react';


import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";


// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }


//TODO:
function base64AndPost(img){
router.post('/thumbnail-base64', async (req, res) => {
  try {
    //const imageResponse = await axios({ url: req.body.url, responseType: 'arraybuffer' })
    const reader = new FileReader();

    const buffer = Buffer.from(reader.readAsDataURL(img), 'binary')

    sharp(buffer).resize(50, 50).jpeg({ quality: 50 }).toBuffer().then(data => {
      const base64Img = `data:image/jpeg;base64,` + data.toString('base64')
      res.status(200)
        .send({ base64Img });
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({ "Error": "Something went wrong at the server!" })
  }
})
}



class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-2",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },

      {
        uid: "-xxx",
        percent: 50,
        name: "image.png",
        status: "uploading",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-5",
        name: "image.png",
        status: "error",
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // file.preview = await getBase64(file.originFileObj);
      file.preview = await base64AndPost(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          className="Upload-Ant"
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

class ImageUpload extends React.Component {

  render() {
    return (
      // <div className="imgbb" style={{display:"grid !important" , gridTemplateColumns: "auto auto auto !important"}}>
      <div className="imgbb" style={{ display: "flex", flexDirection: "column" }}>
        <PicturesWall />
      </div>
    );
  }
}

export default ImageUpload;

