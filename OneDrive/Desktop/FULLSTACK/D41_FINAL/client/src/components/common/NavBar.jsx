import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { setBoards } from '../../redux/features/boardSlice'
import boardApi from '../../api/boardApi'

const NavBar = ({ toggleSidebar }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const user = useSelector((state) => state.user.value)
    const boards = useSelector((state) => state.board.value)

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const addBoard = async () => {
        try {
            const res = await boardApi.create()
            const newList = [res, ...boards]
            dispatch(setBoards(newList))
            navigate(`/boards/${res.id}`)
        } catch (err) {
            alert(err)
        }
    }

    const accessReport = async () => {
        try {
            console.log('Navigating to report page');
            navigate('/report');
        } catch (err) {
            console.log('Error navigating to report page:', err);
            alert(err);
        }
    }

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleSidebar}
                    sx={{ mr: 2 }}
                >
                    <KeyboardArrowDownIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {/* {user.username} */}
                </Typography>
                <Button color="inherit" onClick={accessReport} startIcon={<AddBoxOutlinedIcon />}>
                    Report
                </Button>
                <Button color="inherit" onClick={addBoard} startIcon={<AddBoxOutlinedIcon />}>
                    Add Board
                </Button>
                <Button color="inherit" onClick={logout} startIcon={<LogoutOutlinedIcon />}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar