import React from "react";
import Table from "../Table";
import Button from "../Button";

const PendingPostsLayout = () => {
  const columns = [
    { field: "id", label: "ID", align: "center", size: "sm" },
    { field: "user", label: "Posted By", align: "left", size: "md" },
    { field: "title", label: "Title", align: "left" },
    { field: "createdAt", label: "Created At", align: "center", size: "md" },
    { field: "actions", label: "Actions", align: "center" },
  ];
  const rows = [
    {
      id: 1,
      user: "sosig69",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
      actions: (
        <React.Fragment>
          <Button variant="contained" label="Approve" color="green" fullWidth />
          <Button variant="contained" label="Reject" color="red" fullWidth />
        </React.Fragment>
      ),
    },
    {
      id: 2,
      user: "sosig9",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 3,
      user: "sosig",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 4,
      user: "sosig6",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
    },
  ];
  return (
    <React.Fragment>
      <h1>PENDING POSTS</h1>
      <Table columns={columns} rows={rows} />
    </React.Fragment>
  );
};

export default PendingPostsLayout;
