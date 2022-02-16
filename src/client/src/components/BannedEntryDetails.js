import React from "react";
import DetailsGroup from "./DetailsGroup";
import styles from "../styles/BanDetails.module.css";
import Button from "./Button";
import axios from "axios";

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const BannedEntryDetails = ({ ctx }) => {
  const handleUnban = () => {
    if (window.confirm("Unban this user?")) {
      axios
        .post(`/dashboard/actions/unbanuser/${ctx.id}`)
        .finally(() => window.location.reload());
    }
  };
  return (
    <div className={styles.content}>
      <DetailsGroup label="user" value={`${ctx.target.user.username}`} />
      <DetailsGroup
        label="charged offense"
        value={`${ctx.offense.id}: ${ctx.offense.title}`}
      />
      <DetailsGroup label="banned by" value={`${ctx.reporter.username}`} />
      <DetailsGroup label="banned at" value={`${formatDate(ctx.createdAt)}`} />
      <DetailsGroup label="expires at" value={`${formatDate(ctx.expiresAt)}`} />
      {ctx.note && <DetailsGroup label="ban note" value={ctx.note} />}
      <Button
        color="blue"
        fullWidth
        label={`unban ${ctx.target.user.username}`}
        onClick={handleUnban}
        variant="contained"
      />
    </div>
  );
};

export default BannedEntryDetails;
