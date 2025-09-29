import AddBook from "./AddBook";
import BookList from "./BookList";
import AddMobile from "./AddMobile";
import BookEdit from "./BookEdit";
import MobileEdit from "./MobileEdit";
import MobileList from "./MobileList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Default route → MobileList */}
          <Route path="/" element={<MobileList />} />

          {/* Book routes */}
          <Route path="/books" element={<BookList />} />
          <Route path="/add/book" element={<AddBook />} />
          <Route path="/edit/book/:id" element={<BookEdit />} />

          {/* Mobile routes */}
          <Route path="/mobiles" element={<MobileList />} />
          <Route path="/add/mobile" element={<AddMobile />} />
          <Route path="/edit/mobile/:id" element={<MobileEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
