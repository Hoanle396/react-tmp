import React ,{ useState} from 'react'
import{Grid,Card, Input, Spacer,Button,Text} from '@nextui-org/react'
import { useNavigate } from "react-router-dom";
import axios from "../../../axios.cf";
export default function Login({doLogin,auth}) {
   const [username,setUsername]=useState()
   const [password,setPassword]=useState()
   const [error,setError]=useState("")
   const navigate=useNavigate()
   const handleSubmit=()=>{
      setError("")
      axios.post('/auth/login/admin',{username:username,password:password})
      .then((res)=>{
         doLogin(res.data.access_token)
         localStorage.setItem('token',res.data.access_token)
         navigate('/home')
      })
      .catch((err)=>{
         console.log(err)
          setError(err.response.data.message)
      })
   }
  return (
   <Grid.Container gap={2}  justify="center">
      <Grid xs={4}>
        
      <Card css={{ mw: "400px" , marginTop:"100px" }}>
      <Text gap={4} justify="center" color="primary">Login</Text>
       <Spacer y={2}/>
       <Text color="red">{error}</Text>
       <Spacer y={2}/>
      <Input clearable bordered labelPlaceholder="User name" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
      <Spacer y={2.5} />
      <Input.Password clearable bordered labelPlaceholder="Pass word" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      <Spacer y={2.5} />
      <Button color="gradient" auto onClick={handleSubmit}>
          Login
        </Button>
    </Card>
      </Grid>
   
    </Grid.Container>
  )
}