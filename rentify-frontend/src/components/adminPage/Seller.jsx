import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

const Seller = () => {
  return (
    <>
      <div>
      <Header />
      <div className="flex h-screen">
        {/* <div className="h-screen hidden lg:block fixed top-0 w-1/6"> */}
        <div className="z-10 bg-background pt-4 fixed">
          <div className='w-100px'>
          <SideBar />
          </div>
        </div>
        <main className="w-full pt-16 lg:ml-72 ">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  )
}

export default Seller

