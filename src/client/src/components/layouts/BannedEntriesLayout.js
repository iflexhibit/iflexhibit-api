import React from "react";
import Table from "../Table";
import Button from "../Button";

const BannedEntriesLayout = () => {
  const columns = [
    { field: "id", label: "ID", align: "center" },
    { field: "user", label: "Posted By", align: "left" },
    { field: "title", label: "Title", align: "left" },
    { field: "createdAt", label: "Created At", align: "center" },
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
          <Button variant="contained" label="Inspect" color="blue" />
        </React.Fragment>
      ),
    },
    {
      id: 2,
      user: "sosig69",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 3,
      user: "sosig69",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 4,
      user: "sosig69",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
    },
  ];
  const options = [
    { value: "date", label: "Most Recent" },
    { value: "views", label: "Most Views" },
    { value: "likes", label: "Top Rated" },
    { value: "comments", label: "Most Discussed" },
  ];
  return (
    <React.Fragment>
      <h1>PENDING POSTS</h1>
      <Table
        columns={columns}
        rows={rows}
        controls="Banned Users"
        options={options}
      />
    </React.Fragment>
  );
};

export default BannedEntriesLayout;
