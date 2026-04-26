import React from 'react'
import { SidebarTrigger } from './sidebar'
import { Button } from './button'
import { useAuth } from '@/Context/AuthContext'

function Header() {
  const {Logout,token} = useAuth()
  
  return (
    <div className= "">
      <div className="flex justify-start">
         <SidebarTrigger />
</div>
     <div className="flex  justify-self-end">

    
        <Button className="relative bottom-6 right-5" onClick={Logout}>Logout</Button>
         </div>
     
       
          
        
        
        
    </div>
  )
}

export default Header