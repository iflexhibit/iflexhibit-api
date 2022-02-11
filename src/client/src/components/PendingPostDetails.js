import React from "react";
import styles from "../styles/PendingPostDetails.module.css";
import Button from "./Button";
import ExternalIcon from "./icons/ExternalIcon";
import DetailsGroup from "./DetailsGroup";
import axios from "axios";

const PendingPostDetails = ({ ctx }) => {
  const handleApprove = () => {
    if (window.confirm("Approve this post?")) {
      axios
        .post(`/dashboard/actions/approvepost/${ctx.id}`)
        .finally(() => window.location.reload());
    }
  };

  const handleReject = () => {
    if (window.confirm("Reject this post?")) {
      axios
        .post(`/dashboard/actions/rejectpost/${ctx.id}`)
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
      <PostActions handleApprove={handleApprove} handleReject={handleReject} />
      <small>
        Learn more about our{" "}
        <a
          href="https://iflexhibit.com/legal"
          rel="noopener noreferrer"
          target="_blank"
        >
          Terms of Service
        </a>
      </small>
    </div>
  );
};

const PostActions = ({ handleApprove, handleReject }) => {
  return (
    <div className={styles.actions}>
      <Button
        color="green"
        fullWidth
        label="Approve"
        variant="contained"
        onClick={handleApprove}
      />
      <Button
        color="red"
        fullWidth
        label="Reject"
        variant="contained"
        onClick={handleReject}
      />
    </div>
  );
};

export default PendingPostDetails;
