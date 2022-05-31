import React, { useEffect, useState } from 'react'
import { Button, Grid, Image, Input, Spacer, Text } from '@nextui-org/react'
import axios from '../../../axios.cf'
import Swal from 'sweetalert2';
import Select from 'react-select';
const options = []
export default function AddLession() {
   const [selectedOption, setSelectedOption] = useState(null);
   const [description, setDescription] = useState();
   const [course, setCourse] = useState([])
   const [numerical, setNumerical] = useState();
   const [url, setUrl] = useState();
   useEffect(() => {
      axios.get('/course')
         .then((response) => {
            setCourse(response.data)
            course.map((item) => { options.push({ value: item.id, label: item.title }) })
         })
         .catch((error) => console.log(error))
   }, [])
   const handleSubmit = () => {
      console.log({ lesson: selectedOption.value, description: description, url: url, numerical: numerical })
      axios.post('/course/lession', { lesson: selectedOption.value, description: description, lessonUrl: url, numerical: numerical })
         .then(res => {
            console.log(res)
            Swal.fire(
               'Added!',
               'Your Course has been Add.',
               'success'
            )
         })
         .catch(err => {
            console.log(err)
            Swal.fire(
               'Addd!',
               'Your Course not has added.',
               'error'
            )
         })
   }
   return (
      <Grid.Container gap={4} justify="center" display="flex" >
         <Grid alignItems="center">
            <Text h1
               size={30}
               weight="bold" gap={4} >Add New Lession</Text>
            <Spacer y={2} />
            <Select
               placeholder="Course"
               defaultValue={selectedOption}
               onChange={setSelectedOption}
               options={options}
            />
            <Spacer y={1} />
            <Input
               bordered
               size="md"
               width="450px"
               label="Numerical"
               value={numerical}
               onChange={(e) => { setNumerical(e.target.value) }}
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
               width="450px"
               label="Lesssion URL"
               value={url}
               onChange={(e) => { setUrl(e.target.value) }}
               color="primary" />

            <Spacer y={2} />
            <Button color="gradient" onClick={handleSubmit}>
               Add now
            </Button>
         </Grid>
      </Grid.Container>
   )
}
