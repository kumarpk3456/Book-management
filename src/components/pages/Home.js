import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sign_img from "./Sign_img";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline, MdOutlinePreview } from "react-icons/md";
import flasher from "@flasher/flasher";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]); // full list
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const totalPages = Math.ceil(books.length / booksPerPage);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const loadBooks = async () => {
    const result = await axios.get("http://localhost:3003/books");
    const reversed = result.data.reverse();
    setAllBooks(reversed);
    setBooks(reversed);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteBook = async (id) => {
    Swal.fire({
      title: "Are you sure to delete this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await axios.delete(`http://localhost:3003/books/${id}`);
        if (response.Successful == false) {
          toast.warning(response.Message);
        } else {
          toast.success("Deleted Successfully");
          loadBooks();
        }
      }
    });
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    const result = allBooks.filter(
      (book) =>
        book.Title.toLowerCase().includes(search.toLowerCase()) ||
        book.Author.toLowerCase().includes(search.toLowerCase())
    );
    setBooks(result);
    setCurrentPage(1); // optional: reset to page 1 on search
  }, [search, allBooks]);

  useEffect(() => {
    const result = allBooks.filter(
      (book) =>
        book.Status.toLowerCase().includes(Filter.toLowerCase()) ||
        book.Genre.toLowerCase().includes(Filter.toLowerCase())
    );
    setBooks(result);
    setCurrentPage(1); // optional: reset to page 1 on search
  }, [Filter, allBooks]);

  return (
    <div>
      <div className="py-2">
        <h1 className="text-center">Book List</h1>
        <div className="container-fluid">
          <section className="h-screen row">
            <div className="left_data col-8 mt-1 p-1" style={{ width: "100%" }}>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="Search">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Title or Author"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1); // Reset page on search
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="Genre">Select Genre</label>
                  <select
                    id="Genre"
                    name="Genre"
                    value={Filter}
                    onChange={(e) => {
                      setFilter(e.target.value);
                      setCurrentPage(1); // Reset page on search
                    }}
                  >
                    <option value="">-- Select --</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Crime and mystery">Crime and mystery</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Historical">Historical</option>
                    <option value="Historical fiction">
                      Historical fiction
                    </option>
                    <option value="Horror">Horror</option>
                    <option value="Romance">Romance</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="PublishedYear">Select Published Year</label>
                  <select
                    id="Status"
                    name="Status"
                    value={Filter}
                    onChange={(e) => {
                      setFilter(e.target.value);
                      setCurrentPage(1); // Reset page on search
                    }}
                  >
                    <option value="">-- Select --</option>
                    <option value="Available">Available</option>
                    <option value="Issued">Issued</option>
                  </select>
                </div>
              </div>
              <table className="table text-center border shadow">
                <thead className="bg-success">
                  <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Published Year</th>
                    <th scope="col">Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBooks.map((book, index) => (
                    <tr key={book.id}>
                      <th scope="row">{indexOfFirstBook + index + 1}</th>
                      <td>{book.Title}</td>
                      <td>{book.Author}</td>
                      <td>{book.Genre}</td>
                      <td>{book.PublishedYear}</td>
                      <td>{book.Status}</td>
                      <td>
                        <Link
                          exact
                          to={`/books/${book.id}`}
                          className="btn btn-outline-info mr-2"
                        >
                          <MdOutlinePreview size={20} />
                        </Link>
                        <Link
                          exact
                          to={`/books/edit/${book.id}`}
                          className="btn btn-outline-success mr-2"
                        >
                          <BiEdit size={20} />
                        </Link>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteBook(book.id)}
                        >
                          <MdDeleteOutline size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              <div className="d-flex justify-content-end mt-3">
                <nav>
                  <ul className="pagination">
                    {[...Array(totalPages).keys()].map((num) => (
                      <li
                        key={num + 1}
                        className={`page-item ${
                          currentPage === num + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          onClick={() => paginate(num + 1)}
                          className="page-link"
                        >
                          {num + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            <div
              className="col-2 d-flex align-items-center"
              style={{ height: "60vh" }}
            >
              <Sign_img />
            </div>
          </section>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
