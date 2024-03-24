import { Routes, Route } from 'react-router-dom';
import PATHROUTES from './helpers/routesFront'
import Home from './views/home/Home.jsx';
import LogIn from './views/login/login';
import SignIn from './views/signIn/SignIn';
import Landing from './views/landing/Landing';
import './App.module.sass'


function App() {
  //   const { pathname } = useLocation()
  
  //   useEffect(()=>{
    //     if (pathname === "/") {
      //       document.body.className = "access";
      //    }
      //     if (pathname === "/logIn") {
        //       document.body.className = "access";
        //    }
        //    if (pathname === "/signIn") {
          //     document.body.className = "access";
          //  }
          //   },[pathname])
          

          
  return (
       <div>
      {/* <NavBar></NavBar> */}
        <main>
          <Routes>
            <Route path={PATHROUTES.landing} element={<Landing />} />
            <Route path={PATHROUTES.home} element={<Home/>}/> 
            <Route path={PATHROUTES.logIn} element={<LogIn />}/>
            <Route path={PATHROUTES.signIn} element={<SignIn />}/>
          </Routes>
        </main>
      </div>
  )
}

export default App;