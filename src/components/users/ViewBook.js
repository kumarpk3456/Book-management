import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import bookimg from "../../bookslandscape.png";

function ViewBook() {
  const [book, setBook] = useState({
    Title: "",
    Author: "",
    Genre: "",
    PublishedYear: "",
    Status: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    const res = await axios.get(`http://localhost:3003/books/${id}`);
    setBook(res.data);
  };

  return (
    <div className="container py-4">
      <Link className="btn text-dark btn-outline-success " to="/">
        Back to Home
      </Link>
      <h1 className="display-4">Book Id : {id}</h1>
      <hr />
      {/* <ul className="list-group w-50">
        <li className="list-group-item">Title : {book.Title}</li>
        <li className="list-group-item">Author : {book.Author}</li>
        <li className="list-group-item">Genre : {book.Genre}</li>
        <li className="list-group-item">
          PublishedYear : {book.PublishedYear}
        </li>
        <li className="list-group-item">Status : {book.Status} </li>
      </ul> */}
      {/* <div class="card text-light">
        <img src={bookimg} height={"300vh"} class="card-img" alt="..." />
        <div class="card-img-overlay">
          <h1 class="card-title">{book.Title}</h1>
          <div class="row text-center">
            <h3 class="col-6">Author - {book.Author}</h3>
            <h3 class="col-6">Genre - {book.Genre}</h3>
            <h3 class="col-6">Published Year - {book.PublishedYear}</h3>
            <h3 class="col-6">Status - {book.Status}</h3>
          </div>
        </div>
      </div> */}
      <div className="card text-light position-relative">
        {/* Background Image */}
        <img
          src={bookimg}
          height="300"
          className="card-img"
          alt="Book Cover"
          style={{ objectFit: "cover" }}
        />

        {/* Overlay with semi-transparent background */}
        <div
          className="card-img-overlay d-flex flex-column justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <h1 className="card-title text-white">{book.Title}</h1>
          <div className="row text-center">
            <h3 className="col-6 text-white">Author - {book.Author}</h3>
            <h3 className="col-6 text-white">Genre - {book.Genre}</h3>
            <h3 className="col-6 text-white">
              Published Year - {book.PublishedYear}
            </h3>
            <h3 className="col-6 text-white">Status - {book.Status}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBook;
