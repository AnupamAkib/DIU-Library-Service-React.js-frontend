import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import StudentHomePage from './components/student/home/StudentHomePage';
import BookDetails from './components/student/readBooks/BookDetails';
import ReadBook from './components/student/readBooks/ReadBook';
import BookList from './components/student/booklists/BookList';
import Registration from './components/student/registration/Registration';
import Login from './components/student/login/Login';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/student/' element={<StudentHomePage />} />
        <Route path='/book/details/:bookID' element={<BookDetails />} />
        <Route path='/book/read/:bookID' element={<ReadBook />} />
        <Route path='/student/booklist' element={<BookList />} />
        <Route path='/student/registration' element={<Registration />} />
        <Route path='/student/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
