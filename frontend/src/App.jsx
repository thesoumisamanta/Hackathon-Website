import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HackathonCard from './components/HackathonCard'
import Layout from './components/Layout'

export default function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    path: "hackathon",
                    element: <HackathonCard/>
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}
