import { Button, Card, Grid, Spacer, Text } from '@nextui-org/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
  const navigation = useNavigate()
  return (
    <Grid.Container gap={2}  justify="center">
      <Grid xs={4}>
        
      <Card  css={{ mw: "400px" , marginTop:"150px" ,display:'flex' ,alignItems:'center'}}>
      <Text h1
        size={60}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold" gap={4} >404</Text>
       <Spacer y={2}/>
       <Text h1 css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}>Not Found</Text>
       <Spacer y={2}/>
      <Button color="gradient" auto onClick={()=>{navigation('/')}}>
          Back Home
        </Button>
    </Card>
      </Grid>
   
    </Grid.Container>
  )
}

export default Page404
