import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, createBrowserRouter, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Detail from "./pages/Detail/Detail";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import ToDoList from "./pages/ToDoList/ToDoList";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DemoHoc from "./pages/DemoHoc/DemoHoc";
import Modal from "./HOC/Modal/Modal";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import UserLoginTemplate from "./templates/HomeTemplate/UserLoginTemplate";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import { GlobalNavigate } from "./util/GlobalNavigate";
import TableTest from "./pages/tableTest";



function App() {
   

  return (
    <BrowserRouter>
    <GlobalNavigate />
    <Modal />
    <LoadingComponent />
      <Routes>
        <Route path="/table" element={<HomeTemplate Component={TableTest}/>}></Route>
        <Route path="/home" element={<HomeTemplate Component={Home}/>} />
        <Route path="/contact" element={<HomeTemplate Component={Contact}/>} />
        <Route path="/about" element={<HomeTemplate Component={About}/>} />
        <Route path="/" element={<HomeTemplate Component={Home}/>}></Route>
        <Route path="/login" element={<UserLoginTemplate Component={LoginCyberBugs}/>}></Route>
        <Route path="/detail/:id" element={<HomeTemplate Component={Detail}/>}></Route>
        <Route path="*" element={<HomeTemplate Component={PageNotFound}/>}></Route>
        <Route path="/profile" element={<HomeTemplate Component={Profile}/>}></Route>
        <Route path="/todolist" element={<HomeTemplate Component={ToDoList}/>}></Route>
        <Route path="/todoListRFC" element={<HomeTemplate Component={ToDoListRFC}/>}></Route>
        <Route path='/demoHoc' element={<HomeTemplate Component={DemoHoc}/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
