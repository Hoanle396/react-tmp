import { Button, Card, Grid, Image, Input, Spacer, Text } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../../axios.cf'
import Lession from '../../../components/Lession';
import Loadding from '../../../components/Loadding';
export default function DetailsCourse() {
   const [data, setData] = useState()
   let params = useParams();
   const navigate = useNavigate()
   const id = params.id
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      loadData()
   }, [])
   const loadData = () => {
      axios.get('/course/' + id)
         .then((response) => {
            setData(response.data)
         })
         .catch((error) => {
            alert(error.message)
         })
         .finally(() => {
            setLoading(false)
         })
   }
   const handleDelete=(id) => {
      Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
       }).then((result) => {
         if (result.isConfirmed) {
           axios.delete('/course/detail/'+id)
             .then(() => {
               Swal.fire(
                 'Deleted!',
                 'Your Course has been deleted.',
                 'success'
               )
              loadData()
             })
             .catch((err) => {
               console.log(err)
               Swal.fire(
                 'Deleted! failed',
                 'Your Course not deleted.',
                 'error'
               )
             })
         }
       })
   }
   const addLession=(id) => {
      navigate('/course/lession/new')
   }
   if (loading) {
      return <Loadding/>
   }
   return (
      <Grid.Container gap={4} justify="center" display="flex" >
         <Spacer x={-5} />
         <Grid alignItems="center" >
            <Card alignItems="center">
               <Spacer y={2} />
               <Image width={180}
                  src={data.image} />
               <Text h1
                  size={25} gap={4} > {data.title}</Text>
               <Text h1
                  size={20} gap={4} >Des: {data.description}</Text>
               <Spacer y={1} />
            </Card>
            <Spacer y={1} />
            {data.detail.map((item)=><Lession title={item.description} id={item.id} handleDelete={handleDelete}/>)}
            <Spacer y={1} />
            <Button onClick={addLession}>Add new lession</Button>
         </Grid>
         
      </Grid.Container>
   )
}
