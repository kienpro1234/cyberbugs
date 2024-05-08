import React from 'react'
import styleLoading from "./LoadingComponent.module.css"
import { useSelector } from 'react-redux'

export default function LoadingComponent() {
    let {isLoading} = useSelector(state => state.loadingReducer);
    if (isLoading){
        return (
            <div>
                <img className={styleLoading.bgLoading} src={require("../../../assets/imgLoading/image_processing20191106-25582-1546bff.gif")} alt=''></img>
            </div>
          )
    } else {
        return ""
    }
  
}
