import React, { useReducer, useCallback } from "react";
import { mutate } from "swr";
import PropTypes from "prop-types";
import { useAuth } from "use-auth0-hooks";
import { registryType } from "../types";
import { adminFetchIt, AUTH0_API_IDENTIFIER } from "../utils";
import Button from "./Button";
import Modal from "./Modal";
import Link from "./Link";

const audience = AUTH0_API_IDENTIFIER;

const initialState = {
  isConfirmOpen: false,
  deleteItemId: "",
  deleteItemName: "",
};

const reducer = (state, action) => {
  const { type, deleteItemId, deleteItemName } = action;
  switch (type) {
    case "Open_Delete":
      return { ...state, isConfirmOpen: true, deleteItemId, deleteItemName };
    case "Close_Delete":
      return initialState;
    default:
      return state;
  }
};

export default function AdminItemsTable({ registry }) {
  const { accessToken } = useAuth({ audience });
  const [state, dispatch] = useReducer(reducer, initialState);

  // state and props
  const { isConfirmOpen, deleteItemId, deleteItemName } = state;
  const { items, _id } = registry;
  const registryId = _id;

  // closes the delete modal
  const handleDeleteClose = useCallback(() => {
    dispatch({ type: "Close_Delete" });
  }, []);

  // opens the delete modal and sets the item to be deleted
  const handleDeleteOpen = (deleteItemId, deleteItemName) => {
    dispatch({ type: "Open_Delete", deleteItemId, deleteItemName });
  };

  // deletes item and updates our cache
  const handleDeletion = id => {
    mutate("/registry/admin", async items => {
      try {
        await adminFetchIt(`/item/${id}/registry/${registryId}`, accessToken, {
          method: "DELETE",
        });
        handleDeleteClose();
        const updatedItems = items && items.filter(item => item._id !== id);
        return { ...registry, items: updatedItems };
      } catch (err) {
        console.log(err);
        handleDeleteClose();
        return registry;
      }
    });
  };

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
                  <Link href={`/admin/gifts/${item._id}`}>Edit</Link>

                  <Button
                    type="button"
                    onClick={() => handleDeleteOpen(item._id, item.name)}
                    bgColor="bg-red-500 hover:bg-red-400"
                    addStyles="ml-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal isOpen={isConfirmOpen} handleClose={handleDeleteClose}>
        <div className="p-6">
          <p className="text-center text-lg">
            Are you sure that you want to remove {deleteItemName || "this gift"}{" "}
            from this list?
          </p>
          <div className="flex justify-end mt-5">
            <Button onClick={() => handleDeletion(deleteItemId)}>Delete</Button>
            <Button
              onClick={handleDeleteClose}
              bgColor="bg-red-500 hover:bg-red-400"
              addStyles="ml-3"
            >
              Cancel
            </Button>
          </div>
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
}

AdminItemsTable.propTypes = {
  registry: PropTypes.shape(registryType),
};
