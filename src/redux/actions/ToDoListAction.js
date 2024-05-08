import axios from "axios";
import React from "react";
import { GET_TASK_API } from "../constants/ToDoListType";

export const getTaskListApi = () => {
  return async (dispatch) => {
    try {
      let res = await axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });

      if (res.status === 200){
        dispatch({
          type: GET_TASK_API,
          taskList: res.data,
        })
      }
    }catch(err){
      alert(err.response.data)
    }
    }
    
};

export const deleteTaskApi = (taskName) => {
  return async (dispatch) => {
    try{
      let res = await axios({
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
        method: "DELETE",
      });
  
      if (res.status === 200) {
        dispatch(getTaskListApi());
      }
    } catch(err){
      alert(err.response.data);
    }
  };
};

export const checkTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise
      .then((res) => {
        alert(res.data);
        dispatch(getTaskListApi());
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
};

export const undoDoneTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise
      .then((res) => {
        alert(res.data);
        dispatch(getTaskListApi());
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
};
