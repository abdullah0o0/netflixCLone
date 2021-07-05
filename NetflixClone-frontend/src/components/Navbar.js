import React, { useEffect, useState } from 'react'
import '../assets/Nav.scss'

export default function Navbar() {
    const [show,handleShow] = useState(false)
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                handleShow(true)
            }else{
                handleShow(false)
            }
        })
        return () =>{
            window.removeEventListener("scroll")
        }
    },[])
    return (
        <div className={`nav ${show && "nav_black"}`} >
            <img className="nav_logo" src="https://cloudfront-us-east-1.images.arcpublishing.com/gray/3HCWZMP7PFGY3OJJPFHIX5O2VI.png" 
            alt="Netflix Logo" />

            <img className="nav_avatar" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix Logo" />
            
        </div>
    )
}