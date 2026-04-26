import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route,Routes} from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import SideBar from './components/SideBar'
import AddItems from './Pages/AddItems'
import Header from './components/ui/Header'
import { SidebarProvider } from './components/ui/sidebar'
import Login from './Pages/Login'
import { useAuth } from './Context/AuthContext'
import ListItems from './Pages/ListItems'
import EditItems from './Pages/EditItems'
import AllOrders from './Pages/AllOrders'
import {ToastContainer} from 'react-toastify'


function App() {
 const {token} = useAuth()

  return (
    <>
    {
      token === "" ? <Login  /> :

    <div className="flex min-h-screen mt-1">
        <ToastContainer />     
       <SidebarProvider>

      
      <SideBar />

   
      <div className="flex-1">

       
        <Header />

       
        <div className="mt- p-4">  
        
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/additems' element={<AddItems />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/listitems" element={<ListItems  />} />
            <Route path="/edit/:productId" element={<EditItems  />} />
            <Route path="/allorders" element={<AllOrders />} />
          </Routes>
        </div>

      </div>
       </ SidebarProvider>
    </div>
}
    </>
  )
}

export default App
