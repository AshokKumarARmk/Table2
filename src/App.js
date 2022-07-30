import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    medicineid: "",
    price: "",
    medicinename: "",
    stock: "",
    offer: "",
  });

  const [editFormData, setEditFormData] = useState({
    medicineid: "",
    price: "",
    medicinename: "",
    stock: "",
    offer: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      medicineid: addFormData.medicineid,
      price: addFormData.price,
      medicinename: addFormData.medicinename,
      stock: addFormData.stock,
      offer: addFormData.offer,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      medicineid: editFormData.medicineid,
      price: editFormData.price,
      medicinename: editFormData.medicinename,
      stock: editFormData.stock,
      offer: editFormData.offer,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      medicineid: contact.medicineid,
      price: contact.price,
      medicinename: contact.medicinename,
      stock: contact.stock,
      offer: contact.offer,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Prodct ID</th>
              <th>Medicine Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Offer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add Medicine</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="medicineid"
          required="required"
          placeholder="Enter Product ID."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="medicinename"
          required="required"
          placeholder="Enter Medicine Name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="price"
          required="required"
          placeholder="Enter Stock..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="stock"
          required="required"
          placeholder="Enter Price..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="offer"
          required="required"
          placeholder="Enter the offer..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
