import { Box, Toolbar } from '@mui/material'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authUtils from '../../utils/authUtils'
import Loading from '../common/Loading'
import Sidebar from '../common/Sidebar'
import { setUser } from '../../redux/features/userSlice'
import NavBar from '../common/NavBar' //import top navbar

const AppLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true) // State to control sidebar visibility

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated()
      if (!user) {
        navigate('/login')
      } else {
        // save user
        dispatch(setUser(user))
        setLoading(false)
      }
    }
    checkAuth()
  }, [navigate, dispatch])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    loading ? (
      <Loading fullHeight />
    ) : (
      <Box sx={{
        display: 'flex'
      }}>
        {sidebarOpen && <Sidebar />} {/* Conditionally render Sidebar */}
        {/* <Sidebar /> */}
        <Box sx={{
          flexGrow: 1,
          p: 1,
          width: 'max-content'
        }}>
          <NavBar toggleSidebar={toggleSidebar} />
          <Toolbar /> {/* This is to give space for the AppBar */}
          <Outlet />
        </Box>
      </Box>
    )
  )
}

export default AppLayout