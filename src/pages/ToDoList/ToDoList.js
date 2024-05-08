import React, { Component } from "react";
import "./ToDoList.css";
import axios from "axios";

export default class ToDoList extends Component {
  state = {
    taskList: [],
    values: {
      taskName: "",
    },
  };
  componentDidMount = () => {
    this.getTaskList();
  };
  getTaskList = () => {
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((result) => {
      this.setState({
        taskList: result.data,
      });
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };

  renderToDoTask = () => {
    return this.state.taskList
      .filter((task) => !task.status)
      .map((task, index) => {
        return (
          <li key={index}>
            <span>{task.taskName}</span>
            <div class="buttons">
              <button
                class="remove"
                onClick={() => {
                  this.deleteTask(task.taskName);
                }}
              >
                <i class="fa fa-trash-alt"></i>
              </button>
              <button
                class="complete"
                onClick={() => {
                  this.checktask(task.taskName);
                }}
              >
                <i class="far fa-check-circle"></i>
              </button>
            </div>
          </li>
        );
      });
  };

  deleteTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise
      .then((res) => {
        alert(res.data);
        this.getTaskList();
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  checktask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise
      .then((res) => {
        alert(res.data);
        this.getTaskList();
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  renderDoneTask = () => {
    return this.state.taskList
      .filter((task) => task.status)
      .map((task, index) => {
        return (
          <li key={index}>
            <span>{task.taskName}</span>
            <div class="buttons">
              <button
                class="remove"
                onClick={() => {
                  this.deleteTask(task.taskName);
                }}
              >
                <i class="fa fa-trash-alt "></i>
              </button>
              <button class="complete" onClick={() => {
                this.undoDoneTask(task.taskName)
              }}>
                <i class="fas fa-undo"></i>
              </button>
            </div>
          </li>
        );
      });
  };
  undoDoneTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    })

    promise.then(res => {
      alert(res.data);
      this.getTaskList();
    }).catch(err => {
      alert(err.response.data)
    })
  }

  handleInput = (e) => {
    let { name, value } = e.target;
    let newValues = { ...this.state.values };
    newValues = { ...newValues, [name]: value };

    this.setState({
      ...this.state,
      values: newValues,
    });
  };

  addTask = () => {
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: this.state.values.taskName },
    });

    promise
      .then((result) => {
        alert("Thêm task thành công");
        this.getTaskList();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  render() {
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
                  onChange={this.handleInput}
                />
                <button
                  id="addItem"
                  onClick={() => {
                    this.addTask();
                  }}
                >
                  <i className="fa fa-plus" />
                </button>
              </div>
              <div className="card__todo">
                <ul className="todo" id="todo">
                  {this.renderToDoTask()}
                </ul>
                <ul className="todo" id="completed">
                  {this.renderDoneTask()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
