import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Profile() {
    if (localStorage.getItem('userLogin')){
        return (
            <div>
                Profile
            </div>
          )
    } else {
        alert("Vui lòng đăng nhập để xem profile")
        // return redirect("/login");
         // navigate("/login");
        return <Navigate to={"/login"}></Navigate>
    }
   
}
