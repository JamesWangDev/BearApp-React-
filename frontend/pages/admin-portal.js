import React from "react";
import PropTypes from "prop-types";
import { itemType } from "../types";
import { fetchIt } from "../utils";
import Button from "../components/Button";

const handleDelete = id => {
  deleteItem(id);
};

const deleteItem = async id => {
  await fetchIt(`/item/${id}`, { method: "DELETE" });
};

const AdminPortal = ({ items }) => {
  if (items.message) {
    return <div>{items.message}</div>;
  }
  return (
    <div>
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
                  <Button type="button" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
          width: 90%;
        }
        th {
          background-color: #f4f4f4;
          padding: 10px;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
};

AdminPortal.getInitialProps = async () => {
  const items = await fetchIt("/items");
  return { items };
};

AdminPortal.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
};

export default AdminPortal;
export { itemType };
