import { CLICK_EDIT_FORM_CYBERBUGS } from "../constants/Cyberbugs/CyberbugsConst";

const initialState = {
  projectEdit: {
    id: "0",
    categoryId: "2",
    projectName: "string",
    description: "string",
    creator: 0,
  },
};

export const ProjectFormCyberbugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_EDIT_FORM_CYBERBUGS: {
      console.log("projectEdit", action.projectEdit)
      return { ...state, projectEdit: action.projectEdit };
    }
    default:
      return state;
  }
};
