import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { checkTaskApi, deleteTaskApi, getTaskListApi, undoDoneTaskApi } from '../../redux/actions/ToDoListAction';
import { ADD_TASK_API_ACTION, CHECK_TASK_API_ACTION, DELETE_TASK_API_ACTION, GET_TASK_API, GET_TASK_API_ACTION, REJECT_TASK_API_ACTION } from '../../redux/constants/ToDoListType';



export default function ToDoListRFC() {
  let taskList = useSelector(state => state.toDoListReducer.taskList);
  let dispatch = useDispatch();
  let [state, setState] = useState({
    values: {
      taskName: "",
    }
  })

  const handleInput = (e) => {
    let {name, value} = e.target;
    let newValues = {...state.values};
    newValues = {...newValues, [name]: value};

    setState({
      ...state,
      values: newValues,
    })
  }

  useEffect(() => {
    getTaskList();
  
    return () => {
    }
  }, []);

  const getTaskList = () => {
    dispatch({
      type: GET_TASK_API_ACTION,
    })
  }

  const deleteTask = (taskName) => {
    dispatch({
      type: DELETE_TASK_API_ACTION,
      taskName: taskName
    })
  }

  const checktask = (taskName) => {
    dispatch({
      type: CHECK_TASK_API_ACTION,
      taskName,
    })
  }

  const undoDoneTask = (taskName) => {
    dispatch({
      type: REJECT_TASK_API_ACTION,
      taskName
    })
  }
  const renderToDoTask = () => {
    return taskList
      .filter((task) => !task.status)
      .map((task, index) => {
        return (
          <li key={index}>
            <span>{task.taskName}</span>
            <div class="buttons">
              <button
                class="remove"
                onClick={() => {
                  deleteTask(task.taskName);
                }}
              >
                <i class="fa fa-trash-alt"></i>
              </button>
              <button
                class="complete"
                onClick={() => {
                  checktask(task.taskName);
                }}
              >
                <i class="far fa-check-circle"></i>
              </button>
            </div>
          </li>
        );
      });
  }
  

  const renderDoneTask = () => {
    return taskList.filter((task) => task.status).map((task, index) => {
      return (
        <li key={index}>
          <span>{task.taskName}</span>
          <div class="buttons">
            <button
              class="remove"
              onClick={() => {
                deleteTask(task.taskName);
              }}
            >
              <i class="fa fa-trash-alt"></i>
            </button>
            <button
              class="complete"
              onClick={() => {
                undoDoneTask(task.taskName)
              }}
            >
              <i class="fas fa-undo"></i>
            </button>
          </div>
        </li>
      );
    });
  }

  const addTask = () => {
    dispatch({
      type: ADD_TASK_API_ACTION,
      taskName: state.values.taskName,
    })
  }
  
  return (
    <div>
      <div className="card">
          <div className="card__header">
            <img src='{require("./X2oObC4.png")}' alt="" />
          </div>
          <div className="card__body">
            <div className="card__content">
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>4/23/2024</p>
              </div>
              <div className="card__add">
                <input
                  name="taskName"
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                  onChange={handleInput}
                />
                <button
                  id="addItem"
                  onClick={() => {
                    addTask();
                  }}
                >
                  <i className="fa fa-plus" />
                </button>
              </div>
              <div className="card__todo">
                <ul className="todo" id="todo">
                  {renderToDoTask()}
                </ul>
                <ul className="todo" id="completed">
                  {renderDoneTask()}
                </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
