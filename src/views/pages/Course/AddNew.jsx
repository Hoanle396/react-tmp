import React, { useState } from 'react'
import { Button, Grid, Image, Input, Spacer, Text } from '@nextui-org/react'
import axios from '../../../axios.cf'
import Swal from 'sweetalert2';
export default function AddNew() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [background, setBackground] = useState('#FFFFFF');
  const [discount,setDiscount] = useState();
  const [image, setImage] = useState();
  const [upload, setUpload] = useState();
  const handleSubmit = () => {
    console.log(upload)
    axios.post('/course',{title: title, description: description,discount:Number(discount), background: background,files:upload},{
      headers: {
        "Content-Type": "multipart/form-data",
      }})
    .then(res=>{
      console.log(res)
      Swal.fire(
        'Added!',
        'Your Course has been Add.',
        'success'
      )
    })
    .catch(err =>{
      console.log(err)
      Swal.fire(
        'Addd!',
        'Your Course not has added.',
        'error'
      )
    })
    .finally(() => {

    })
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]; 
      setUpload(img)
      setImage(URL.createObjectURL(img))
    }
  }
  return (
    <Grid.Container gap={4} justify="center" display="flex" >
      <Grid alignItems="center">
        <Text h1
          size={30}
          weight="bold" gap={4} >Add New Course</Text>
        <Spacer y={2} />
        <Input
          bordered
          size="md"
          width="450px"
          label="Title"
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
          color="primary" />
        <Spacer y={1} />
        <Input
          bordered
          size="md"
          width="450px"
          label="Description"
          value={description}
          onChange={(e)=>{setDescription(e.target.value)}}
          color="primary" />
        <Spacer y={1} />
        <Input
          bordered
          size="md"
          type="number"
          width="450px"
          label="Discount"
          value={discount}
          onChange={(e)=>{setDiscount(e.target.value)}}
          color="primary" />
        <Spacer y={1} />
        <Input
          bordered
          size="md"
          width="450px"
          type="color"
          value={background}
          onChange={(e)=>{setBackground(e.target.value)}}
          label="Background Color"
          color="primary" />
        <Spacer y={1} />
        <Input
          bordered
          size="md"
          width="450px"
          color="primary"
          type="file"
          onChange={onImageChange}
          contentRightStyling={false}
          label="Image icon"
        />
        {image && <Image width={320}
          height={180}
          src={image} />}
        <Spacer y={2} />
        <Button color="gradient" onClick={handleSubmit}>
          Add now
        </Button>
      </Grid>
    </Grid.Container>
  )
}
