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
import AllLockerInfo from './components/security/AllLockerInfo';
import Home from './components/Home';

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
