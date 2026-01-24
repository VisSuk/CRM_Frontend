import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import UserDashboard from './users/pages/UserDashboard'
import UserTasks from './users/pages/UserTasks'
import UserLogs from './users/pages/UserLogs'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminUsers from './admin/pages/AdminUsers'
import AdminTasks from './admin/pages/AdminTasks'
import AdminLogs from './admin/pages/AdminLogs'


function App() {
  
  

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>} />
        <Route path='/dashboard' element={<UserDashboard/>}/>
        <Route path='/tasks' element={<UserTasks/>}/>
        <Route path='/logs' element={<UserLogs/>}/>

        <Route path='/admin-dash' element={<AdminDashboard/>}/>
        <Route path='/admin-users' element={<AdminUsers/>}/>
        <Route path='/admin-tasks' element={<AdminTasks/>}/>
        <Route path='/admin-logs' element={<AdminLogs/>}/>

      </Routes>

    </>
  )
}

export default App
