import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import StudentHomePage from './components/student/home/StudentHomePage';
import BookDetails from './components/student/readBooks/BookDetails';
import ReadBook from './components/student/readBooks/ReadBook';
import BookList from './components/student/booklists/BookList';
import Registration from './components/student/registration/Registration';
import Login from './components/student/login/Login';
import ChangePass from './components/student/ChangePass';
import PassRecovery from './components/student/PassRecovery';
import Home from './components/Home';
import AllLockerInfo from './components/security/AllLockerInfo';
import SecurityLogin from './components/security/SecurityLogin';
import ViewStudent from './components/security/ViewStudent';
import AdminDashboard from './components/admin/Dashboard';
import AddBook from './components/admin/add_book/AddBook';
import EditBook from './components/admin/edit_book/EditBook';
import SearchBook from './components/admin/search_book/SearchBook';
import ReDirect from './components/admin/delete_book/ReDirect';
import ManageGuards from './components/admin/manage_guards/ManageGuards';
import ManageAdmin from './components/admin/manage_admin/ManageAdmin';
import RedirectToManageAdmin from './components/admin/manage_admin/RedirectToManageAdmin';
import AdminLogin from './components/admin/login/AdminLogin';
import ActivityLog from './components/admin/activity_log/ActivityLog';
import ViewUsers from './components/admin/view_students/ViewUsers';
import RedirectViewUser from './components/admin/view_students/RedirectViewUser';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/student/' element={<StudentHomePage />} />
        <Route path='/book/details/:bookID' element={<BookDetails />} />
        <Route path='/book/read/:bookID' element={<ReadBook />} />
        <Route path='/student/booklist' element={<BookList />} />
        <Route path='/student/registration' element={<Registration />} />
        <Route path='/student/login' element={<Login />} />
        <Route path='/student/change_password' element={<ChangePass />} />
        <Route path='/student/password_recovery' element={<PassRecovery />} />


        <Route path='/guards/all_distributed_key' element={<AllLockerInfo />} />
        <Route path='/guards/login' element={<SecurityLogin />} />
        <Route path='/guards/view_student_info' element={<ViewStudent />} />

        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/add_book' element={<AddBook />} />
        <Route path='/admin/search_book/:action' element={<SearchBook />} />
        <Route path='/admin/search_book/' element={<ReDirect />} />
        <Route path='/admin/edit_book/:bookID' element={<EditBook />} />
        <Route path='/admin/manage_guards' element={<ManageGuards />} />
        <Route path='/admin/manage_admin' element={<ManageAdmin />} />
        <Route path='/admin/redirect' element={<RedirectToManageAdmin />} />
        <Route path='/admin/activity_logs' element={<ActivityLog />} />
        <Route path='/admin/view_users' element={<ViewUsers />} />
        <Route path='/admin/view_users/redirect' element={<RedirectViewUser />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
