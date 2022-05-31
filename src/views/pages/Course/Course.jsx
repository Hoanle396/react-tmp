import React, { useEffect, useState } from 'react'
import Loading from '../../../components/Loadding'
import axios from '../../../axios.cf'
import { MdEdit, MdDelete } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Card, Col, Row, Table, Text, Tooltip, User } from '@nextui-org/react';
import {  useNavigate } from 'react-router-dom'
const Course = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRow] = useState([])
  const navigate = useNavigate()
  const columns = [
    { key: "title", label: "TITLE", },
    { key: "description", label: "DES" },
    { key: "image", label: "PHOTO" },
    { key: "discount", label: "DISCOUNT" },
    { key: 'actions', label: 'ACTIONS' }
  ];
  useEffect(() => {
    loadData()
  }, [])
  const loadData=()=>{
    axios.get('/course')
      .then((response) => {
        setRow(response.data)
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleDelete = (id) => {
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
        axios.delete('/course/'+id)
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
          .finally(() => {
            setLoading(false)
          })

      }
    })
  
  }
 
  const renderCell = (course, columnKey) => {
    const cellValue = course[columnKey];
    switch (columnKey) {
      case "image":
        return (
          <User squared src={course.image} css={{ p: 0 }}></User>
        );
      // case "background":
      //   return (
      //     <Card css={{ w: "$24", h: "$15", backgroundColor: course.background }}>
      //       <Text h6 size={10} color="white" css={{ mt: 0 }}>
      //         {course.background}
      //       </Text>
      //     </Card>
      //   )
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details"
                onClick={() =>navigate('details/'+course.id,{id:course.id})}>
                <FaEye />
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit"
                onClick={() =>{ navigate('edit/'+course.id,{id:course.id})}}>
                <MdEdit />
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete"
                color="error"
                onClick={() =>{ handleDelete(course.id)}}
              >
                <MdDelete />
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  if (loading) {
    return <Loading />;
  }
  else {
    return (
      <div>
        <Card css={{ marginTop: "100px" }}>
          <Text h1 size={30} color="primary" weight="bold" gap={4} align="center">Course</Text>
          <Table
            lined
            headerLined
            shadow={false}
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={rows}>
              {(item) => (
                <Table.Row key={item.index}>
                  {(columnKey) => <Table.Cell
                  >{renderCell(item, columnKey)}</Table.Cell>}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Card>
      </div>
    )
  }

}
export default Course
