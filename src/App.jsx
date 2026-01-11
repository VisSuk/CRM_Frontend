import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import UserDashboard from './users/pages/UserDashboard'
import UserViewTask from './users/pages/UserViewTask'
import UserTasks from './users/pages/UserTasks'
import UserLogs from './users/pages/UserLogs'
import AddEdit from './users/pages/AddEdit'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminUsers from './admin/pages/AdminUsers'
import AdminTasks from './admin/pages/AdminTasks'
import AdminLogs from './admin/pages/AdminLogs'
import AdminUserDetails from './admin/pages/AdminUserDetails'
import ViewTask from './admin/pages/ViewTask'

function App() {
  
  

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>} />
        <Route path='/dashboard' element={<UserDashboard/>}/>
        <Route path='/tasks' element={<UserTasks/>}/>
        <Route path='/task/:id' element={<UserViewTask/>}/>
        <Route path='/logs' element={<UserLogs/>}/>
        <Route path='/addTask' element={<AddEdit/>}/>        
        <Route path='/editTask/:id' element={<AddEdit edit/>}/> 

        <Route path='/admin-dash' element={<AdminDashboard/>}/>
        <Route path='/admin-users' element={<AdminUsers/>}/>
        <Route path='/admin-tasks' element={<AdminTasks/>}/>
        <Route path='/admin-logs' element={<AdminLogs/>}/>
        <Route path='/admin-users/:id' element={<AdminUserDetails/>}/>
        <Route path='/admin-task/:id' element={<ViewTask/>}/>
      </Routes>

    </>
  )
}

export default App
