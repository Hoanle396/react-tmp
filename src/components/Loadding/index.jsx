import { Loading } from '@nextui-org/react'
import React from 'react'
import './loadding.css'
export default function Loadding() {
  return (
    <div className="container d-flex center">
       <Loading loadingCss={{ $$loadingSize: "30px", $$loadingBorder: "10px" }} type="points" />
    </div>
  )
}
