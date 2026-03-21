import React from 'react'
import { Routes,Route} from 'react-router-dom'
import AddUser from './AddUser'
import Users from './Users'
import UpdateUser from './UpdateUser'
import PrivateRoutes from './PrivateRoutes'
import Loggin from "./Loggin"
import Createacc from './Createacc'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Loggin />} />
        <Route path="/createacc" element={<Createacc/>}/>

        
        <Route path="/Add" element={ 
          <PrivateRoutes> <AddUser/> </PrivateRoutes>}/>
        
        <Route path="/user" element={
          <PrivateRoutes><Users/></PrivateRoutes>}/>

        <Route path="/update/:id" element={
          <PrivateRoutes><UpdateUser /></PrivateRoutes>}/>

                
    </Routes>
  );
}
