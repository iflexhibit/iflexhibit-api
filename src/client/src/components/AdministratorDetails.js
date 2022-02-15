import React from "react";
import styles from "../styles/PendingPostDetails.module.css";
import Button from "./Button";
import ExternalIcon from "./icons/ExternalIcon";
import DetailsGroup from "./DetailsGroup";
import axios from "axios";

const AdministratorDetails = ({ ctx }) => {
  const handleDemote = () => {
    if (window.confirm("Reject this post?")) {
      console.log(ctx);
    }
  };

  return (
    <div className={styles.details}>
      <DetailsGroup label="id" value={ctx.id} />
      <DetailsGroup label="username" value={ctx.username} />
      <DetailsGroup
        label="username"
        value={
          <a
            href={`https://iflexhibit.com/profile/${ctx.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ctx.username} <ExternalIcon />
          </a>
        }
      />
      <DetailsGroup label="email" value={ctx.email} />
      <DetailsGroup label="first name" value={ctx.givenName} />
      <DetailsGroup label="last name" value={ctx.familyName} />
      {ctx.contact && <DetailsGroup label="contact" value={ctx.contact} />}
      <Actions handleDemote={handleDemote} />
    </div>
  );
};

const Actions = ({ handleDemote }) => {
  return (
    <div className={styles.actions}>
      <Button
        color="red"
        fullWidth
        label="Demote"
        variant="contained"
        onClick={handleDemote}
      />
    </div>
  );
};

export default AdministratorDetails;
