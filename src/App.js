import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './views/pages/Login/Login';
import Page404 from './views/pages/Error/Page404'
import { connect } from "react-redux";
import PrivateRoute from './PrivateRoute';
import Home from './views/pages/home'
import {doLogin} from './actions/auth'
import AddNew from './views/pages/Course/AddNew';
import Course from './views/pages/Course/Course';
import EditCourse from './views/pages/Course/EditCourse';
import DetailsCourse from './views/pages/Course/DetailsCourse';
import AddLession from './views/pages/Course/AddLession';
const App = ({auth, doLogin}) => {

  return  (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute auth={auth} component={<Home/>}/>} />
        <Route path="/login" element={<Login doLogin={doLogin} auth={auth}/>} />
        <Route path="/home" element={<PrivateRoute auth={auth} component={<Home/>}/>} />
        <Route path="/dashboard" element={<PrivateRoute auth={auth} component={<Page404/>}/>} />

        <Route path="/course" element={<PrivateRoute auth={auth} component={<Course/>}/>} />
        <Route path="/course/new" element={<PrivateRoute auth={auth} component={<AddNew/>}/>} />
        <Route path="/course/edit/:id" element={<PrivateRoute auth={auth} component={<EditCourse/>}/>} />
        <Route path="/course/details/:id" element={<PrivateRoute auth={auth} component={<DetailsCourse/>}/>} />
        <Route path="/course/lession/new" element={<PrivateRoute auth={auth} component={<AddLession/>}/>} />
        
        <Route path="/users" element={<PrivateRoute auth={auth} component={<Page404/>}/>} />
        <Route path="*" element={<Page404/>} />
      </Routes>
    </BrowserRouter>
  ) 

}
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps,{doLogin})(App);
