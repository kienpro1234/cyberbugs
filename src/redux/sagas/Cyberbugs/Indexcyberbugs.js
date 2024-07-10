import React, { useEffect } from "react";
import MainHeader from "../../../components/Cyberbugs/Main/MainHeader";
import MainInfo from "../../../components/Cyberbugs/Main/MainInfo";
import MainContent from "../../../components/Cyberbugs/Main/MainContent";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROJECT_DETAIL_SAGA } from "../../constants/Cyberbugs/CyberbugsConst";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

export default function Indexcyberbugs(props) {
  const { projectId } = useParams();
  const { projectDetail } = useSelector(
    (state) => state.ProjectCyberbugsReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (projectId) {
      dispatch({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId, 
      });
    }
  }, []);
  return (
    <div className="main">
      <MainHeader projectDetail={projectDetail} />
      <h3>{projectDetail.projectName}</h3>
      {projectDetail.description ? parse(projectDetail.description) : ""}
      <MainInfo projectDetail={projectDetail} />
      <MainContent projectDetail={projectDetail} />
    </div>
  );
}
