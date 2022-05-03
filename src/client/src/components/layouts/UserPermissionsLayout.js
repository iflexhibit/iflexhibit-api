import React, { useEffect, useState } from "react";
import Table from "../Table";
import Modal from "../Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/layouts/UserPermissionsLayout.module.css";
import ModeratorDetails from "../ModeratorDetails";
import AdministratorDetails from "../AdministratorDetails";
import Button from "../Button";
import TextInput from "../TextInput";
import DetailsGroup from "../DetailsGroup";

const formatData = (data) => {
  const rows = data.map((d) => ({
    id: d.id,
    username: d.username,
    givenName: d.givenName,
    familyName: d.familyName,
    link: `https://iflexhibit.vercel.app/profile/${d.id}`,
    createdAt: formatDate(d.createdAt),
    actions: d,
  }));
  return rows;
};

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const UserPermissionsLayout = () => {
  const navigate = useNavigate();

  const SORT_OPTIONS = [
    { value: "id", label: "Sort by ID" },
    { value: "username", label: "Sort by Username" },
    { value: "fname", label: "Sort by First Name" },
    { value: "lname", label: "Sort by Last Name" },
    { value: "date", label: "Sort by Date Joined" },
  ];

  const MODERATORS_COLUMN = [
    { field: "id", label: "ID", align: "center", size: "sm" },
    { field: "username", label: "Username", align: "center" },
    { field: "givenName", label: "First Name", align: "center" },
    { field: "familyName", label: "Last Name", align: "center" },
    {
      field: "link",
      label: "Link",
      align: "center",
      size: "sm",
      hidden: true,
      external: true,
    },
    {
      field: "createdAt",
      label: "Created At",
      align: "center",
    },
    {
      field: "actions",
      label: "Actions",
      align: "center",
      size: "md",
      buttonClick: (ctx) => {
        setModalOpen(true);
        setModalContent({
          label: <h1>Moderator Details</h1>,
          body: <ModeratorDetails ctx={ctx} />,
        });
      },
    },
  ];

  const ADMINISTRATORS_COLUMN = [
    { field: "id", label: "ID", align: "center", size: "sm" },
    { field: "username", label: "Username", align: "center" },
    { field: "givenName", label: "First Name", align: "center" },
    { field: "familyName", label: "Last Name", align: "center" },
    {
      field: "link",
      label: "Link",
      align: "center",
      size: "sm",
      hidden: true,
      external: true,
    },
    {
      field: "createdAt",
      label: "Created At",
      align: "center",
    },
    {
      field: "actions",
      label: "Actions",
      align: "center",
      size: "md",
      buttonClick: (ctx) => {
        setModalOpen(true);
        setModalContent({
          label: <h1>Administrator Details</h1>,
          body: <AdministratorDetails ctx={ctx} />,
        });
      },
    },
  ];

  const [member, setMember] = useState({});
  const [moderators, setModerators] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [modSort, setModSort] = useState(SORT_OPTIONS[0].value);
  const [adminSort, setAdminSort] = useState(SORT_OPTIONS[0].value);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ label: "", body: "" });
  const [modLoading, setModLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [email, setEmail] = useState("");

  const fetchModerators = () => {
    setModLoading(true);
    axios
      .get(`/dashboard/data/users/ut2`)
      .then((response) => {
        setModLoading(false);
        setModerators(formatData(response.data.users));
      })
      .catch(() => {
        setModLoading(false);
        setModerators([]);
        navigate("/login");
      });
  };

  const fetchAdministrators = () => {
    setAdminLoading(true);
    axios
      .get(`/dashboard/data/users/ut3`)
      .then((response) => {
        setAdminLoading(false);
        setAdministrators(formatData(response.data.users));
      })
      .catch(() => {
        setAdminLoading(false);
        setAdministrators([]);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchModerators();
  }, [modSort]);

  useEffect(() => {
    fetchAdministrators();
  }, [adminSort]);

  const handleEmailSearch = () => {
    axios
      .get(`/dashboard/data/search/${email}`)
      .then((response) => setMember(response.data.user))
      .catch((error) => {
        if (error.response.status !== 401 && error.response.status !== 403) {
          setMember({});
          window.alert("User does not exist or is not a member");
        } else {
          window.location.reload();
        }
      });
  };

  const handlePromote = () => {
    if (window.confirm(`Promote member ${member.username}?`)) {
      axios
        .post(`/dashboard/actions/promote/member/${member.id}`)
        .then(() => {
          window.alert("Member successfully promoted");
          setMember({});
          setEmail("");
        })
        .catch(() => {
          window.alert("Refresh and try again");
          setMember({});
        });
    }
  };

  return (
    <React.Fragment>
      <h1>User Permissions</h1>
      <div className={styles.tables}>
        <Table
          columns={MODERATORS_COLUMN}
          rows={moderators}
          controls={`Moderators`}
          options={SORT_OPTIONS}
          value={modSort}
          onChange={(e) => setModSort(e.target.value)}
        />
        <Table
          columns={ADMINISTRATORS_COLUMN}
          rows={administrators}
          controls={`Administrators`}
          options={SORT_OPTIONS}
          value={adminSort}
          onChange={(e) => setAdminSort(e.target.value)}
        />
      </div>
      <h1>Promote a member</h1>
      <div className={styles.promote}>
        <div className={styles.search}>
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Search for a member by email"
            onEnterKey={handleEmailSearch}
          />
          <Button
            label="search"
            variant="contained"
            color="blue"
            disabled={email === ""}
            onClick={handleEmailSearch}
          />
        </div>
        <div className={styles.member}>
          <DetailsGroup label="Username" value={member?.username || "---"} />
          <DetailsGroup label="First Name" value={member?.givenName || "---"} />
          <DetailsGroup label="Last Name" value={member?.familyName || "---"} />
          <DetailsGroup label="Status" value={member?.usertype || "---"} />
          <DetailsGroup label="Email" value={member?.email || "---"} />
          <DetailsGroup label="Contact" value={member?.contact || "---"} />
          <DetailsGroup
            label="Joined At"
            value={member?.createdAt ? formatDate(member?.createdAt) : "---"}
          />
          <Button
            color="green"
            fullWidth
            label="promote"
            variant="contained"
            disabled={Object.keys(member).length === 0}
            onClick={handlePromote}
          />
        </div>
      </div>
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

export default UserPermissionsLayout;
