import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import flasher from "@flasher/flasher";
import { ToastContainer, toast } from 'react-toastify';

function AddBooks() {
  let navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [book, setBook] = useState({
    Title: "",
    Author: "",
    Genre: "",
    PublishedYear: "",
    Status: "",
  });

  const years = Array.from({ length: 1000 }, (_, i) => currentYear - i); // last 50 years

  const { Title, Author, Genre, PublishedYear, Status } = book;

  const validateForm = () => {
    if (!Title) {
      // alert("Please enter the book title.");
      toast.error("Please enter the book title.");
      return false;
    }
    if (!Author.trim()) {
      toast.error("Please enter the author's name.");
      return false;
    }
    if (!Genre) {
      toast.error("Please select a genre.");
      return false;
    }
    if (!PublishedYear) {
      toast.error("Please select the published year.");
      return false;
    }
    if (!Status) {
      toast.error("Please select the book status.");
      return false;
    }
    return true;
  };

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.post("http://localhost:3003/books", book);
      toast.success("Book added successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <form className="myForm my-3" onSubmit={(e) => onSubmit(e)}>
        <div className="d-flex justify-content-between">
          <h2>Add A Book</h2>
          <Link
            className="btn text-dark btn-outline-success "
            style={{ width: "100px", fontSize: "20px" }}
            to="/"
          >
            <b>Back</b>
          </Link>
        </div>
        <div className="form-group">
          <label htmlFor="Title">Enter Title</label>
          <input
            type="text"
            name="Title"
            className="form-control"
            id="exampleInputTitle"
            value={Title}
            placeholder="Enter Book Title"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Author">Enter Author</label>
          <input
            type="text"
            name="Author"
            className="form-control"
            id="exampleInputAuthor"
            value={Author}
            placeholder="Enter Your Author"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Genre">Select Genre</label>
          <select
            id="Genre"
            name="Genre"
            value={Genre}
            onChange={(e) => onInputChange(e)}
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
            <option value="Historical fiction">Historical fiction</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
        <div className="form-group ">
          <label htmlFor="PublishedYear">Select Published Year</label>
          <select
            id="PublishedYear"
            name="PublishedYear"
            value={PublishedYear}
            onChange={(e) => onInputChange(e)}
          >
            <option value="">-- Select --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Status">Status</label>
          <select
            id="Status"
            name="Status"
            value={Status}
            onChange={(e) => onInputChange(e)}
          >
            <option value="">-- Select --</option>
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success myButton">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddBooks;
