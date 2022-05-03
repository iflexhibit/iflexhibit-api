import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/ReportDetails.module.css";
import Button from "./Button";
import DetailsGroup from "./DetailsGroup";
import ExternalIcon from "./icons/ExternalIcon";
import Select from "./Select";
import TextArea from "./TextArea";

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const ReportedCommentDetails = ({ ctx }) => {
  const [commentOffenses, setCommentOffenses] = useState([]);
  const [selectedOffense, setSelectedOffense] = useState(ctx.offense.id);
  const [banNote, setBanNote] = useState("");

  const handleBanUser = () => {
    if (window.confirm("Ban this user?")) {
      axios
        .post("/dashboard/actions/banuser", {
          reportId: ctx.id,
          offenseId: ctx.offense.id,
          banNote,
        })
        .then(() => window.alert(`${ctx.target.user.username} has been banned`))
        .catch(() => window.alert("Refresh this page and try again"));
    }
  };

  const handleDisableComment = () => {
    if (window.confirm("Disable this comment?")) {
      axios
        .post(`/dashboard/actions/disablecomment`, {
          commentId: ctx.target.comment.id,
          reportId: ctx.id,
        })
        .then(() => window.alert("Comment has been disabled"))
        .catch(() => window.alert("Refresh this page and try again"));
    }
  };

  const handleClearReport = () => {
    if (window.confirm("Clear this report?")) {
      axios
        .post(`/dashboard/actions/clearreport/${ctx.id}`)
        .finally(() => window.location.reload());
    }
  };

  const fetchBanTime = (offenseId) => {
    const offense = commentOffenses.find((o) => o.id === offenseId);
    if (!offense) return "";
    return offense.banTime;
  };

  useEffect(() => {
    axios
      .get("/api/offenses/c")
      .then((response) => setCommentOffenses(response.data.offenses));
  }, [ctx]);
  return (
    <div className={styles.content}>
      <div className={styles.details}>
        <DetailsGroup
          label="reported comment"
          value={
            <LinkValue
              label={ctx.target.comment.body.split("\n").map((p, index) => (
                <p key={index}>{p}</p>
              ))}
              link={`https://iflexhibit.vercel.app/post/${ctx.target.post.id}/title?tab=Comment#${ctx.target.comment.id}`}
            />
          }
        />

        <DetailsGroup
          label="comment by"
          value={
            <LinkValue
              label={ctx.target.user.username}
              link={`https://iflexhibit.vercel.app/profile/${ctx.target.user.id}`}
            />
          }
        />
        <DetailsGroup
          label="reported by"
          value={
            <LinkValue
              label={ctx.reporter.username}
              link={`https://iflexhibit.vercel.app/profile/${ctx.reporter.id}`}
            />
          }
        />
        <DetailsGroup
          label="offenses"
          value={`${ctx.offense.id}: ${ctx.offense.title}`}
        />
        {ctx.note && (
          <DetailsGroup
            label="Report Note"
            value={ctx.note.split("\n").map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          />
        )}
        <DetailsGroup label="reported at" value={formatDate(ctx.createdAt)} />
      </div>
      <div className={styles.form}>
        <label htmlFor="commentoffense">
          <div>VIOLATED RULE</div>
          <Select
            id="commentoffense"
            fullWidth
            options={commentOffenses.map((o) => ({
              label: `${o.id}: ${o.title}`,
              value: o.id,
            }))}
            value={selectedOffense}
            onChange={(e) => setSelectedOffense(e.target.value)}
          />
        </label>
        <label htmlFor="bannote">
          <div>BAN DETAILS</div>
          <TextArea
            fullHeight
            id="bannote"
            onChange={(e) => setBanNote(e.target.value)}
            value={banNote}
          />
        </label>
        <small className={styles.warning}>
          {ctx.target.user.username} will be banned for{" "}
          {fetchBanTime(selectedOffense)} days
        </small>
        <div className={styles.actions}>
          <Button
            fullWidth
            color="red"
            variant="contained"
            label={`ban ${ctx.target.user.username}`}
            onClick={handleBanUser}
          />
          <Button
            fullWidth
            color="red"
            variant="outlined"
            label="disable comment"
            onClick={handleDisableComment}
          />
          <Button
            fullWidth
            color="blue"
            variant="outlined"
            label="clear report"
            onClick={handleClearReport}
          />
        </div>
      </div>
      <small>
        Learn more about our{" "}
        <a
          href="https://iflexhibit.vercel.app/legal"
          rel="noopener noreferrer"
          target="_blank"
        >
          Terms of Service
        </a>
      </small>
    </div>
  );
};

const LinkValue = ({ link, label }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    {label} <ExternalIcon />
  </a>
);

export default ReportedCommentDetails;
