import React from "react";
import styles from "../styles/PendingPostDetails.module.css";
import Button from "./Button";
import ExternalIcon from "./icons/ExternalIcon";
import DetailsGroup from "./DetailsGroup";
import axios from "axios";

const DisabledCommentDetails = ({ ctx }) => {
  const handleEnableComment = () => {
    if (window.confirm("Enable this comment?")) {
      axios
        .post(`/dashboard/actions/enablecomment/${ctx.id}`)
        .finally(() => window.location.reload());
    }
  };
  return (
    <div className={styles.details}>
      <DetailsGroup label="author" value={ctx.author.username} />
      <DetailsGroup label="comment" value={ctx.body} />
      <DetailsGroup
        label="link"
        value={
          <a
            href={`https://iflexhibit.vercel.app/post/${ctx.post}/title?tab=Comments#${ctx.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Comment <ExternalIcon />
          </a>
        }
      />
      <Button
        color="blue"
        fullWidth
        label={`enable comment`}
        onClick={handleEnableComment}
        variant="contained"
      />
    </div>
  );
};

export default DisabledCommentDetails;
