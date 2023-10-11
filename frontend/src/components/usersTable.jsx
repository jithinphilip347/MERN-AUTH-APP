import React, { useState } from "react";
import {
  useAdminUpdateUserMutation,
  useUserDataDeleteMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../slices/adminApiSlice";

import { Button, Table, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const UsersTable = ({ users }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [UpdateUser, { isLoading }] = useAdminUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useUserDataDeleteMutation();
  const [blockUser, { isBlocking }] = useBlockUserMutation();
  const [unblockUser, { isUnBlocking }] = useUnblockUserMutation();

  const handleSaveChanges = () => {
    const userData = {
      userId: selectedUser._id,
      name: selectedUser.name,
      email: selectedUser.email,
    };
    UpdateUser(userData);

    handleCloseModal();
    window.location.reload();
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUserDelete = async (userId) => {
    await deleteUser({ userId });
    toast.success("user deleted successfully");
    window.location.reload();
  };
  const handleBlockuser = async (userId) => {
    await blockUser({ userId });
    toast.success("user blocked successfully");
    window.location.reload();
  };
  const handleUnBlockuser = async (userId) => {
    await unblockUser({ userId });
    toast.success("user unblocked successfully");
    window.location.reload();
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const userfilter = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Form>
        <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            style={{ width: "200px", marginBottom: "10px" }}
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userfilter.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  type="button"
                  variant="primary"
                  className="mt-3"
                  onClick={() => handleUpdate(user)}
                >
                  Update
                </Button>
              </td>
              <td>
                {user.isBlocked ? (
                  <Button
                    type="button"
                    variant="success"
                    className="mt-3"
                    onClick={() => handleUnBlockuser(user._id)}
                  >
                    unblock
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="danger"
                    className="mt-3"
                    onClick={() => handleBlockuser(user._id)}
                  >
                    Block
                  </Button>
                )}
              </td>
              <td>
                <Button
                  type="button"
                  variant="dark"
                  className="mt-3"
                  onClick={() => {
                    handleUserDelete(user._id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersTable;
