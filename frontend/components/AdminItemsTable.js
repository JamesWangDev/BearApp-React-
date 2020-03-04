import React, { useState } from "react";
import { mutate } from "swr";
import PropTypes from "prop-types";
import { itemType } from "../types";
import { fetchIt } from "../utils";
import Button from "./Button";
import Modal from "./Modal";

/*const handleDelete = id => {
  mutate("/items", async items => {
    await fetchIt(`/item/${id}`, { method: "DELETE" });
    return items.filter(item => item.id === id);
  });
  setIsConfirmingDelete(false);
};

const handleClose = () => {
  setIsConfirmingDelete(false);
};

const confirmDelete = id => {
  setDeleteId(id);
  setIsConfirmingDelete(true);
};*/

const AdminItemsTable = ({ items }) => {
  const handleDelete = id => {
    mutate("/items", async items => {
      await fetchIt(`/item/${id}`, { method: "DELETE" });
      return items.filter(item => item.id === id);
    });
    setIsConfirmingDelete(false);
  };

  const handleClose = () => {
    setIsConfirmingDelete(false);
  };

  const confirmDelete = (id, itemName) => {
    setDeleteId(id);
    setDeleteItemName(itemName);
    setIsConfirmingDelete(true);
  };

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [deleteItemName, setDeleteItemName] = useState(false);

  if (items.message) {
    return <div>{items.message}</div>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            return (
              <tr key={item._id}>
                <td>
                  <img className="itemImage" src={item.image} />
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <Button type="button">Edit</Button>
                  {` `}
                  <Button
                    type="button"
                    onClick={() => confirmDelete(item._id, item.name)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal isOpen={isConfirmingDelete} handleClose={handleClose}>
        <div className="delete-modal">
          <p>
            Are you sure that you want to remove {deleteItemName} from this
            list?
          </p>
          <Button
            type="button"
            onClick={() => {
              handleDelete(deleteId);
            }}
          >
            Delete
          </Button>{" "}
          {` `}
          <Button
            type="button"
            onClick={() => {
              setIsConfirmingDelete(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <style jsx>{`
        table,
        td,
        th {
          border: 1px solid silver;
          padding: 10px;
          text-align: center;
        }
        .itemImage {
          height: 100px;
          width: 100px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        button {
          margin: 5px;
        }
        table {
          width: 100%;
        }
        th {
          background-color: #f4f4f4;
          padding: 10px;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  );
};

AdminItemsTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
};

AdminItemsTable.defaultProps = {
  items: [],
};

export default AdminItemsTable;
export { itemType };
