import React, { useEffect, useState } from "react";
import Table from "../Table";
import Button from "../Button";
import Modal from "../Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReportedPostDetails from "../ReportedPostDetails";
import ReportedUserDetails from "../ReportedUserDetails";
import ReportedCommentDetails from "../ReportedCommentDetails";

const formatData = (data, type) => {
  switch (type) {
    case "posts": {
      const rows = data.map((d) => ({
        id: d.id,
        postTitle: d.target.post.title,
        reportedBy: d.reporter.username,
        link: `https://iflexhibit.com/post/${d.target.post.id}`,
        reportedAt: formatDate(d.createdAt),
        actions: d,
      }));
      return rows;
    }
    case "users": {
      const rows = data.map((d) => ({
        id: d.id,
        reportedUser: d.target.user.username,
        reportedBy: d.reporter.username,
        link: `https://iflexhibit.com/profile/${d.target.user.id}`,
        reportedAt: formatDate(d.createdAt),
        actions: d,
      }));
      return rows;
    }
    case "comments": {
      const rows = data.map((d) => ({
        id: d.id,
        comment: d.target.comment.body,
        reportedBy: d.reporter.username,
        link: `https://iflexhibit.com/post/${d.target.post.id}/title?tab=Comments#${d.target.comment.id}`,
        reportedAt: formatDate(d.createdAt),
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

const ReportEntriesLayout = () => {
  const navigate = useNavigate();

  const REPORT_TYPES = [
    { value: "posts", label: "Posts" },
    { value: "users", label: "Users" },
    { value: "comments", label: "Comments" },
  ];

  const REPORTED_POSTS_COLUMNS = [
    { field: "id", label: "ID", align: "center", size: "sm" },
    { field: "postTitle", label: "Reported Post", align: "center" },
    { field: "reportedBy", label: "Reported By", align: "center", size: "md" },
    {
      field: "link",
      label: "Link",
      align: "center",
      size: "sm",
      hidden: true,
      external: true,
    },
    { field: "reportedAt", label: "Reported At", align: "center", size: "md" },
    {
      field: "actions",
      label: "Actions",
      align: "center",
      size: "md",
      buttonClick: (ctx) => {
        setModalOpen(true);
        setModalContent({
          label: <h1>Report Details</h1>,
          body: <ReportedPostDetails ctx={ctx} />,
        });
      },
    },
  ];

  const REPORTED_USERS_COLUMNS = [
    { field: "id", label: "ID", align: "center", size: "sm" },
    {
      field: "reportedUser",
      label: "Reported User",
      align: "center",
    },
    { field: "reportedBy", label: "Reported By", align: "center", size: "md" },
    {
      field: "link",
      label: "Link",
      align: "center",
      size: "sm",
      hidden: true,
      external: true,
    },
    { field: "reportedAt", label: "Reported At", align: "center", size: "md" },
    {
      field: "actions",
      label: "Actions",
      align: "center",
      size: "md",
      buttonClick: (ctx) => {
        setModalOpen(true);
        setModalContent({
          label: <h1>Report Details</h1>,
          body: <ReportedUserDetails ctx={ctx} />,
        });
      },
    },
  ];

  const REPORTED_COMMENTS_COLUMNS = [
    { field: "id", label: "ID", align: "center", size: "sm" },
    { field: "comment", label: "Reported Comment", align: "center" },
    { field: "reportedBy", label: "Reported By", align: "center", size: "md" },
    {
      field: "link",
      label: "Link",
      align: "center",
      size: "sm",
      hidden: true,
      external: true,
    },
    { field: "reportedAt", label: "Reported At", align: "center", size: "md" },
    {
      field: "actions",
      label: "Actions",
      align: "center",
      size: "md",
      buttonClick: (ctx) => {
        setModalOpen(true);
        setModalContent({
          label: <h1>Report Details</h1>,
          body: <ReportedCommentDetails ctx={ctx} />,
        });
      },
    },
  ];

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [reportType, setReportType] = useState(REPORT_TYPES[0].value);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ label: "", body: "" });
  const [isLoading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`/dashboard/data/reports/${reportType}`)
      .then((response) => {
        setLoading(false);
        setData(formatData(response.data.data, reportType));
      })
      .catch(() => {
        setLoading(false);
        setData([]);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchData();
    switch (reportType) {
      case "posts":
        return setColumns(REPORTED_POSTS_COLUMNS);
      case "users":
        return setColumns(REPORTED_USERS_COLUMNS);
      case "comments":
        return setColumns(REPORTED_COMMENTS_COLUMNS);
      default:
        return setColumns(REPORTED_POSTS_COLUMNS);
    }
  }, [reportType]);

  return isLoading ? (
    <span>LOADING</span>
  ) : (
    <React.Fragment>
      <h1>REPORT ENTRIES</h1>
      <Table
        columns={columns}
        rows={data}
        controls={`Reported ${reportType}`}
        options={REPORT_TYPES}
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
      />
      {isModalOpen && (
        <Modal
          wide
          label={modalContent.label}
          closeModal={() => setModalOpen(false)}
        >
          {modalContent.body}
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ReportEntriesLayout;
