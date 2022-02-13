import React from "react";
import styles from "../styles/PendingPostDetails.module.css";
import Button from "./Button";
import ExternalIcon from "./icons/ExternalIcon";
import DetailsGroup from "./DetailsGroup";
import axios from "axios";

const DisabledPostDetails = ({ ctx }) => {
  const handleApprove = () => {
    if (window.confirm("Enable this post?")) {
      axios
        .post(`/dashboard/actions/approvepost/${ctx.id}`)
        .finally(() => window.location.reload());
    }
  };
  return (
    <div className={styles.details}>
      <DetailsGroup label="user" value={ctx.author.username} />
      <DetailsGroup label="title" value={ctx.title} />
      <DetailsGroup label="body" value={ctx.body || "[none]"} />
      <DetailsGroup
        label="image"
        value={
          <a href={ctx.image} target="_blank" rel="noopener noreferrer">
            View Image <ExternalIcon />
          </a>
        }
      />
      {ctx.video && (
        <DetailsGroup
          label="video"
          value={
            <a href={ctx.video} target="_blank" rel="noopener noreferrer">
              View Video <ExternalIcon />
            </a>
          }
        />
      )}
      <Button
        color="blue"
        fullWidth
        label={`enable post`}
        onClick={handleApprove}
        variant="contained"
      />
    </div>
  );
};

export default DisabledPostDetails;
