import React from "react";
import styles from "../styles/PendingPostDetails.module.css";
import Button from "./Button";
import ExternalIcon from "./icons/ExternalIcon";

const PendingPostDetails = ({ ctx }) => {
  const handleApprove = () => {
    if (window.confirm("Approve this post?")) {
      console.log("Approve");
    }
  };
  const handleReject = () => {
    if (window.confirm("Reject this post?")) {
      console.log("Reject");
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

const DetailsGroup = ({ label, value }) => (
  <div className={styles.group}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value}</div>
  </div>
);

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
