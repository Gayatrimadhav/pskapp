import React, { useContext, useState } from "react";
import noteContext1 from "../context/noteContext1";

const AddNote = () => {
  const context = useContext(noteContext1);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const clickhere = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    //e-event
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <form>
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter email"
              name="title"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter password"
              name="description"
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">
              tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              placeholder="Enter password"
              name="tag"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={clickhere}>
            AddNote
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
