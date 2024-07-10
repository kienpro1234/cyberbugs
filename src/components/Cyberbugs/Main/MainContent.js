import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { UPDATE_STATUS_TASK_SAGA } from "../../../redux/constants/Cyberbugs/TaskTypeConst";

export default function MainContent({ projectDetail }) {
  const { lstTask } = projectDetail;
  const dispatch = useDispatch();
  const handleDragEnd = (result) => {
    console.log("result", result)
    let { destination, source } = result;
    let {projectId, taskId} = JSON.parse(result.draggableId);
    console.log({projectId, taskId});
    console.log("destination", destination);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //Call api
    dispatch({
      type: UPDATE_STATUS_TASK_SAGA,
      taskUpdateStatus: {
        "taskId": taskId,
        "statusId": destination.droppableId,
        
      },
      "projectId": projectId,
    })


  };
  const renderContent = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {lstTask?.map((item, index) => {
          console.log("ahiahiahi", item)
          return (
            <Droppable droppableId={item.statusId} key={index}>
              {(provided) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    key={index}
                    className="card pb-2"
                    style={{ width: "17rem", height: "auto" }}
                  >
                    <div className="card-header">{item.statusName}</div>
                    <ul className="list-group list-group-flush">
                      {item.lstTaskDeTail?.map((taskDetail, index) => {
                        return (
                          <Draggable
                            draggableId={JSON.stringify({projectId: taskDetail.projectId, taskId: taskDetail.taskId})}
                            key={taskDetail.taskId.toString()}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={index}
                                  className="list-group-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#infoModal"
                                  // style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: "GET_TASK_DETAIL_SAGA",
                                      taskId: taskDetail.taskId,
                                    });
                                  }}
                                >
                                  <p>{taskDetail.taskName}</p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="block-left">
                                      <p>{taskDetail.priorityTask.priority}</p>
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
                                        {taskDetail.assigness?.map(
                                          (mem, index) => {
                                            return (
                                              <div
                                                key={index}
                                                className="avatar"
                                              >
                                                <img
                                                  src={mem.avatar}
                                                  alt={mem.avatar}
                                                />
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {/* {provided.placeholder}  */}
                    </ul>
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          );
        })}
        ;
      </DragDropContext>
    );
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      {renderContent()}
    </div>
  );
}
