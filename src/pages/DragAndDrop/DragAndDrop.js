import React, { useState } from "react";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const DragAndDrop = (props) => {
  const [state, setState] = useState({
    toDo: {
      id: "toDo",
      items: [
        { id: "1", taskName: "Task 1" },
        { id: "2", taskName: "Task 2" },
        { id: "3", taskName: "Task 3" },
      ],
    },
    inProgress: {
      id: "inProgress",
      items: [
        { id: "4", taskName: "Task 4" },
        { id: "5", taskName: "Task 5" },
        { id: "6", taskName: "Task 6" },
      ],
    },
    done: {
      id: "done",
      items: [
        { id: "7", taskName: "Task 7" },
        { id: "8", taskName: "Task 8" },
        { id: "9", taskName: "Task 9" },
      ],
    },
  });

  const handleDragEnd = (result) => {
    console.log("result", result);
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let itemCopy = {...state[source.droppableId].items[source.index]};

    let index = state[source.droppableId].items.findIndex(item => item.id === itemCopy.id);
    state[source.droppableId].items.splice(index, 1);

    state[destination.droppableId].items.splice(destination.index, 0, itemCopy);

    setState({...state});
  };
  return (
    <div className="container">
      <h3 className="text-center display-4">Demo DragAndDrop</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          {_.map(state, (statusTask, index) => {
            return (
              <Droppable droppableId={statusTask.id} key={index}>
                {(provided) => {
                  return (
                    <div
                      className="col-4 bg-dark p-5"
                      key={index}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {statusTask.items.map((task, index) => {
                        return (
                          <Draggable
                            key={task.id}
                            index={index}
                            draggableId={task.id}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mt-2 p-3 bg-white text-center"
                                >
                                  {task.taskName}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};
