import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function MainLayout() {

    return (
        <Fragment>
            <div className='flex items-center gap-4 h-screen relative justify-center'>
                <div className="">
                    <Navbar />
                </div>
                <div className='h-100'>
                    <Outlet />
                </div>
            </div>
        </Fragment>
    )
}

export default MainLayout

