import React from 'react'
import { useMatch } from 'react-router-dom'

export default function PageNotFound() {
    const match = useMatch("*");
    console.log(match)
  return (
    <div>
        Lỗi không tìm thấy trang {match.pathname}
    </div>
  )
}
