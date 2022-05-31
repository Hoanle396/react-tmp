import { Card, Row, Col, Text, Tooltip } from '@nextui-org/react'
import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'


const Lession = ({ title,id, handleDelete }) => {
   const navigate = useNavigate()
   return (
      <Card>
         <Row>
            <Col>
               <Text span="10" h3 size={15} >{title}</Text></Col>
            <Col span="1" > <Tooltip content="Edit" onClick={()=>{ navigate('/new/'+id)}}>
               <MdEdit />
            </Tooltip></Col>
            <Col span="1" ><Tooltip content="Delete" color="error"
               onClick={()=>{handleDelete(id)}}>
               <MdDelete />
            </Tooltip></Col>
         </Row>
      </Card>
   )
}

export default Lession