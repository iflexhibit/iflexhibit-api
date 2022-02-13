import React, { useEffect, useState } from "react";
import Table from "../Table";
import Modal from "../Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BannedEntryDetails from "../BannedEntryDetails";
import DisabledPostDetails from "../DisabledPostDetails";
import DisabledCommentDetails from "../DisabledCommentDetails";

const formatData = (data, type) => {
  switch (type) {
    case "users": {
      const rows = data.map((d) => ({
        id: d.id,
        bannedUser: d.target.user.username,
        bannedBy: d.reporter.username,
        link: `https://iflexhibit.com/profile/${d.target.user.id}`,
        bannedAt: formatDate(d.createdAt),
        expiresAt: formatDate(d.expiresAt),
        actions: d,
      }));
      return rows;
    }
    case "posts": {
      const rows = data.map((d) => ({
        id: d.id,
        username: d.author.username,
        title: d.title,
        body: d.body,
        image: d.image,
        video: d.video,
        createdAt: formatDate(d.createdAt),
        actions: d,
      }));
      return rows;
    }
    case "comments": {
      const rows = data.map((d) => ({
        id: d.id,
        author: d.author.username,
        comment: d.body,
        link: `https://iflexhibit.com/post/${d.post}/title?tab=Comments#${d.id}`,
        createdAt: formatDate(d.createdAt),
        actions: d,
      }));
      return rows;
    }
    default:
      return [];
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const BannedEntriesLayout = () => {
  const navigate = useNavigate();

  const BANNED_TYPES = [
    { value: "users", label: "Users" },
    { value: "posts", label: "Posts" },
    { value: "comments", label: "Comments" },
  ];

  const BANNED_USERS_COLUMNS = [
    { field: "id", label: "ID", align: "center", size: "sm" },
    {
      field: "bannedUser",
      label: "User",
      align: "center",
    },
    { field: "bannedBy", label: "Banned By", align: "center", size: "md" },
    {
      field: "link",
      label: "Link",
      align: "center",
      size: "sm",
      hidden: true,
      external: true,
    },
    { field: "bannedAt", label: "Banned At", align: "center", size: "md" },
    { field: "expiresAt", label: "Expires At", align: "center", size: "md" },
    {
      field: "actions",
      label: "Actions",
      align: "center",
      size: "md",
      buttonClick: (ctx) => {
        setModalOpen(true);
        setModalContent({
          label: <h1>Entry Report</h1>,
          body: <BannedEntryDetails ctx={ctx} />,
        });
      },
    },
  ];

  const DISABLED_POSTS_COLUMNS = [
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
    {
      field: "actions",
      label: "Actions",
      align: "center",
      size: "md",
      buttonClick: (ctx) => {
        setModalContent({
          label: <h1>Entry Report</h1>,
          body: <DisabledPostDetails ctx={ctx} />,
        });
        setModalOpen(true);
      },
    },
  ];

  const DISABLED_COMMENTS_COLUMNS = [
    { field: "id", label: "ID", align: "center", size: "sm" },
    { field: "author", label: "Author", align: "center" },
    { field: "comment", label: "Comment", align: "center", size: "md" },
    {
      field: "link",
      label: "Link",
      align: "center",
      size: "sm",
      hidden: true,
      external: true,
    },
    { field: "createdAt", label: "Created At", align: "center", size: "md" },
    {
      field: "actions",
      label: "Actions",
      align: "center",
      size: "md",
      buttonClick: (ctx) => {
        setModalOpen(true);
        setModalContent({
          label: <h1>Report Details</h1>,
          body: <DisabledCommentDetails ctx={ctx} />,
        });
      },
    },
  ];

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [entryType, setEntryType] = useState(BANNED_TYPES[0].value);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ label: "", body: "" });
  const [isLoading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`/dashboard/data/disabled/${entryType}`)
      .then((response) => {
        setLoading(false);
        setData(formatData(response.data.data, entryType));
      })
      .catch(() => {
        setLoading(false);
        setData([]);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchData();
    switch (entryType) {
      case "posts":
        return setColumns(DISABLED_POSTS_COLUMNS);
      case "users":
        return setColumns(BANNED_USERS_COLUMNS);
      case "comments":
        return setColumns(DISABLED_COMMENTS_COLUMNS);
      default:
        return setColumns(BANNED_USERS_COLUMNS);
    }
  }, [entryType]);

  return isLoading ? (
    <span>LOADING</span>
  ) : (
    <React.Fragment>
      <h1>Banned Entries</h1>
      <Table
        columns={columns}
        rows={data}
        controls={`Banned ${entryType}`}
        options={BANNED_TYPES}
        value={entryType}
        onChange={(e) => setEntryType(e.target.value)}
      />
      {isModalOpen && (
        <Modal
          narrow
          label={modalContent.label}
          closeModal={() => setModalOpen(false)}
        >
          {modalContent.body}
        </Modal>
      )}
    </React.Fragment>
  );
};

export default BannedEntriesLayout;
