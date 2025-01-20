import React from 'react'
import { useState } from 'react'
import Register from './Register'
import "./aut.css"
import Login from './Login'

function Auth() {
    const [comp,setComp] = useState(<Register/>)
    const [whatCOmp , setNewCOmp] = useState(1)
    const [mssage,setMesage] = useState("Alredy have account ?")

    
    

    function handelshowLogin(){
        setComp(<Login/>)
        setNewCOmp(0)
        setMesage("I'dont have account !")
    }

    function handelshowSing(){
      setNewCOmp(1)
      setComp(<Register/>)
      setMesage("Alredy have account ?")
  }
  
  function handelshowcomp (){
    if(whatCOmp ==1){
      handelshowLogin()
    }
    else{
      handelshowSing()
    }
  }
    

  return (

    <div >
      {comp}
      <div className='text-center'><div className='Alredy btn text-gg ' onClick={()=>handelshowcomp()}>{mssage}</div></div>
    </div>
  )
}

export default Auth
