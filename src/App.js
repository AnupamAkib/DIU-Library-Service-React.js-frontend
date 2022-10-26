import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentHomePage from './components/student/home/StudentHomePage';
import BookDetails from './components/student/readBooks/BookDetails';
import ReadBook from './components/student/readBooks/ReadBook';
import BookList from './components/student/booklists/BookList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StudentHomePage />} />
        <Route path='/book/details/:bookID' element={<BookDetails />} />
        <Route path='/book/read/:bookID' element={<ReadBook />} />
        <Route path='/booklist' element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
