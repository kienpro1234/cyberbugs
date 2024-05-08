import React from 'react'
import {useSelector} from "react-redux"

export default function Home() {
  let userLogin = useSelector(state => state.UserCyberBugsReducer.userLogin);
  return (
    <div>
      {userLogin?.name}
      <img src={userLogin?.avatar} alt=''></img>
    </div>
  )
}
