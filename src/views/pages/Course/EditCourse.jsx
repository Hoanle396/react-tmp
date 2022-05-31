import React, { useEffect, useState } from 'react'
import { Button, Grid, Image, Input, Spacer, Text } from '@nextui-org/react'
import axios from '../../../axios.cf'
import { useParams } from 'react-router-dom';
import Loadding from '../../../components/Loadding';
export default function AddNew() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [background, setBackground] = useState();
  const [discount, setDiscount] = useState();
  const [image, setImage] = useState();
  const [upload, setUpload] = useState();
  let params = useParams();
  const  id =params.id
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('/course/' + id)
      .then((response) => {
        setTitle(response.data.title)
        setDescription(response.data.description)
        setImage(response.data.image)
        setBackground(response.data.background)
        setDiscount(response.data.discount)
        console.log(response.data)
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSubmit = () => {
    console.log(upload)
    axios.post('/course', { title: title, description: description, discount: Number(discount), background: background, files: upload }, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
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
  if (loading) {
    return <Loadding/>
  }
  else {
    return (
      <Grid.Container gap={4} justify="center" display="flex" >
        <Grid alignItems="center">
          <Text h1
            size={30}
            weight="bold" gap={4} >Edit Course</Text>
          <Spacer y={2} />
          <Input
            bordered
            size="md"
            width="450px"
            label="Title"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
            color="primary" />
          <Spacer y={1} />
          <Input
            bordered
            size="md"
            width="450px"
            label="Description"
            value={description}
            onChange={(e) => { setDescription(e.target.value) }}
            color="primary" />
          <Spacer y={1} />
          <Input
            bordered
            size="md"
            type="number"
            width="450px"
            label="Discount"
            value={discount}
            onChange={(e) => { setDiscount(e.target.value) }}
            color="primary" />
          <Spacer y={1} />
          <Input
            bordered
            size="md"
            width="450px"
            type="color"
            value={background}
            onChange={(e) => { setBackground(e.target.value) }}
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
            Save
          </Button>
        </Grid>
      </Grid.Container>
    )
  }
}
