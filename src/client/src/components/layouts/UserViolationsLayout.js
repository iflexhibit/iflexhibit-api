import React, { useEffect, useState } from "react";
import Table from "../Table";
import Button from "../Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/layouts/UserPermissionsLayout.module.css";
import TextInput from "../TextInput";

const formatData = (data) => {
  const rows = data.map((d) => ({
    id: d.id,
    reportee: d.reportee,
    offense: d.offense,
    reportedAt: formatDate(d.reportedAt),
  }));

  return rows;
};

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const UserViolationsLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
    { field: "id", label: "ID", align: "center", size: "sm" },
    { field: "reportee", label: "Reportee", align: "center", size: "md" },
    { field: "offense", label: "Offense", align: "center" },
    { field: "reportedAt", label: "Reported at", align: "center", size: "md" },
  ];

  useEffect(() => {
    authUser();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`/dashboard/data/reports/valid/${username}`)
      .then((response) => {
        setLoading(false);
        setData(formatData(response.data.reports));
        if (response.data.reports.length === 0)
          window.alert(
            "User either does not exist or does not have any violations"
          );
      })
      .catch(() => {
        setLoading(false);
        setData([]);
        navigate("/login");
      });
  };
  const authUser = () => {
    axios
      .get("/dashboard/auth/me")
      .then((response) => {
        if (!response.data.user.permissions.adminAccess) {
          setData([]);
          navigate("/login");
        }
      })
      .catch(() => {
        setLoading(false);
        setData([]);
        navigate("/login");
      });
  };
  const [username, setUsername] = useState("");
  return (
    <React.Fragment>
      <h1>USER VIOLATIONS</h1>
      <div className={`${styles.search} ${styles.violations}`}>
        <TextInput
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search by username"
          onEnterKey={fetchData}
        />
        <Button
          label="search"
          variant="contained"
          color="blue"
          disabled={username === ""}
          onClick={fetchData}
        />
      </div>
      <Table columns={columns} rows={data} />
    </React.Fragment>
  );
};

export default UserViolationsLayout;
