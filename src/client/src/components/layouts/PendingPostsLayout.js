import React, { useEffect, useState } from "react";
import Table from "../Table";
import Button from "../Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";

const formatData = (data) => {
  const rows = data.map((d) => ({
    id: d.id,
    username: d.author.username,
    title: d.title,
    body: d.body,
    image: d.image,
    video: d.video,
    createdAt: d.createdAt,
    actions: (
      <React.Fragment>
        <Button variant="contained" label="Approve" color="green" fullWidth />
        <Button variant="contained" label="Reject" color="red" fullWidth />
      </React.Fragment>
    ),
  }));

  return rows;
};

const PendingPostsLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
    { field: "id", label: "ID", align: "center", size: "sm" },
    { field: "username", label: "Posted By", align: "center", size: "md" },
    { field: "title", label: "Title", align: "left" },
    {
      field: "body",
      label: "Body",
      align: "center",
      size: "sm",
      hidden: true,
      buttonClick: (ctx) => {
        setModalContent({
          label: <h1>{ctx.title}</h1>,
          body: <p>{ctx.body}</p>,
        });
        setModalOpen(true);
      },
    },
    {
      field: "image",
      label: "Image",
      align: "center",
      size: "sm",
      hidden: true,
      external: true,
    },
    {
      field: "video",
      label: "Video",
      align: "center",
      size: "sm",
      hidden: true,
      external: true,
    },
    { field: "createdAt", label: "Created At", align: "center", size: "md" },
    { field: "actions", label: "Actions", align: "center" },
  ];

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 30000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("/dashboard/data/pending")
      .then((response) => {
        setLoading(false);
        setData(formatData(response.data.data));
      })
      .catch(() => {
        setLoading(false);
        setData([]);
        navigate("/login");
      });
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ label: "", body: "" });
  return (
    !isLoading && (
      <React.Fragment>
        <h1>PENDING POSTS</h1>
        <Table columns={columns} rows={data} />
        {isModalOpen && (
          <Modal
            label={modalContent.label}
            closeModal={() => setModalOpen(false)}
          >
            {modalContent.body}
          </Modal>
        )}
      </React.Fragment>
    )
  );
};

export default PendingPostsLayout;
