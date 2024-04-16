import React from 'react'
import { Route, Routes } from 'react-router'
import AdminPage from './AdminPage'
import ProblemPage from './ProblemPage'
import UsersPage from './UsersPage'
import Feedbacks from './Feedbacks'

const Admin = () => {
  return (
    <Routes>
      <Route path='/' element={<AdminPage />} />
      <Route path='/problems' element={<ProblemPage />} />
      <Route path='/users' element={<UsersPage />} />
      <Route path="/feedbacks" element={<Feedbacks />} />
    </Routes>
    )
}

export default Admin