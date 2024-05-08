import { Routes, Route } from 'react-router-dom';
import PATHROUTES from './helpers/routesFront';
import TasksView from "./views/tasks/TasksView.jsx";
import MyTasksView from "./views/myTasks/MyTasksView.jsx";
import LogIn from './views/login/login';
import SignIn from './views/signIn/SignIn';
import Landing from './views/landing/Landing';
import './App.module.sass'



function App() {

  return (
       <div>
      {/* <NavBar></NavBar> */}
        <main>
          <Routes>
            <Route path={PATHROUTES.landing} element={<Landing />} />
            <Route path={PATHROUTES.tasks} element={<TasksView/>}/> 
            <Route path={PATHROUTES.myTasks} element={<MyTasksView/>}/> 
            <Route path={PATHROUTES.logIn} element={<LogIn />}/>
            <Route path={PATHROUTES.signIn} element={<SignIn />}/>
          </Routes>
        </main>
      </div>
  )
}

export default App;