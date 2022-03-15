import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/layouts/SystemConfigurationsLayout.module.css";
import Button from "../Button";
import IconButton from "../IconButton";
import TextInput from "../TextInput";
import TimesIcon from "../icons/TimesIcon";
import AngleDownIcon from "../icons/AngleDownIcon";
import AngleDoubleDownIcon from "../icons/AngleDoubleDownIcon";
import AngleUpIcon from "../icons/AngleUpIcon";
import AngleDoubleUpIcon from "../icons/AngleDoubleUpIcon";

Array.prototype.swapItems = function (a, b) {
  this[a] = this.splice(b, 1, this[a])[0];
  return this;
};

Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};

const SystemConfigurationsLayout = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [editablePrograms, setEditablePrograms] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [newProgram, setNewProgram] = useState("");

  const fetchPrograms = () => {
    setLoading(true);
    axios
      .get(`/dashboard/data/configs/programs`)
      .then((response) => {
        setLoading(false);
        setPrograms(response.data.degreePrograms.map((value) => ({ value })));
      })
      .catch(() => {
        setLoading(false);
        setPrograms([]);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const toggleEditing = () => {
    setEditablePrograms(programs);
    setEditing(true);
  };

  const handleProgramEdit = (e, i) => {
    let items = [...editablePrograms];
    items[i] = { value: e.target.value };
    setEditablePrograms(items);
  };

  const handleSaveChanges = () => {
    setEditing(false);
    axios
      .post("/dashboard/actions/programs", {
        programs: editablePrograms.map((p) => encodeURIComponent(p.value)),
      })
      .then(() => {
        fetchPrograms();
        alert("Changes for Degree Programs has been saved");
      })
      .catch(() => alert("Refresh this page and try again"));
  };

  const handleNewProgram = () => {
    const p = editablePrograms.findIndex(
      (v) => v.value.toLowerCase() === newProgram.toLowerCase()
    );
    if (p !== -1)
      return alert(
        `${newProgram} already exists at index #${("0" + (p + 1)).slice(-2)}`
      );
    setEditablePrograms((prev) => [{ value: newProgram }, ...prev]);
    setNewProgram("");
  };

  const handleDeleteProgram = (i) => {
    let items = [...editablePrograms];
    items.splice(i, 1);
    setEditablePrograms(items);
  };

  const handleReset = () => {
    setEditablePrograms(programs);
  };

  const handleCancel = () => [setEditing(false)];

  const handleSort = (i, n) => {
    let items = [...editablePrograms];
    if (n === "first" || n === "last") {
      let item = items.splice(i, 1);
      if (n === "first") return setEditablePrograms([...item, ...items]);
      else return setEditablePrograms([...items, ...item]);
    }
    items.swapItems(i, i + n);
    setEditablePrograms(items);
  };

  return isLoading ? (
    <span>Loading</span>
  ) : (
    <React.Fragment>
      <h1>SYSTEM CONFIGURATIONS</h1>
      <div className={styles.container}>
        <h2>Degree Programs</h2>
        <section className={styles.degreePrograms}>
          {!isEditing ? (
            <Button
              label="Edit"
              variant="outlined"
              color="blue"
              onClick={toggleEditing}
            />
          ) : (
            <div className={styles.controls}>
              <Button
                label="Cancel"
                variant="outlined"
                color="blue"
                onClick={handleCancel}
              />
              <Button
                label="Reset"
                variant="outlined"
                color="blue"
                onClick={handleReset}
                disabled={programs.equals(editablePrograms)}
              />
              <Button
                label="Save Changes"
                variant="contained"
                color="blue"
                onClick={handleSaveChanges}
                disabled={programs.equals(editablePrograms)}
              />
            </div>
          )}
          <div className={styles.programs}>
            {isEditing ? (
              <>
                <div className={styles.new}>
                  <TextInput
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    onEnterKey={
                      newProgram.trim().length !== 0 && handleNewProgram
                    }
                  />
                  <Button
                    label="Add degree program"
                    variant="contained"
                    color="blue"
                    disabled={newProgram.trim().length === 0}
                    onClick={handleNewProgram}
                  />
                </div>
                {editablePrograms.map((program, i) => (
                  <div
                    className={`${styles.program} ${
                      Object.is(editablePrograms[i], programs[i])
                        ? ""
                        : styles.modified
                    }`}
                    key={i}
                  >
                    <IconButton
                      icon={<TimesIcon />}
                      variant="contained"
                      color="red"
                      onClick={() => handleDeleteProgram(i)}
                    />
                    <div className={styles.sort}>
                      <IconButton
                        icon={<AngleDoubleDownIcon />}
                        variant="outlined"
                        onClick={() => handleSort(i, "last")}
                        disabled={i + 1 === editablePrograms.length}
                      />
                      <IconButton
                        icon={<AngleDownIcon />}
                        variant="outlined"
                        onClick={() => handleSort(i, 1)}
                        disabled={i + 1 === editablePrograms.length}
                      />
                      <IconButton
                        icon={<AngleUpIcon />}
                        variant="outlined"
                        onClick={() => handleSort(i, -1)}
                        disabled={i === 0}
                      />
                      <IconButton
                        icon={<AngleDoubleUpIcon />}
                        variant="outlined"
                        onClick={() => handleSort(i, "first")}
                        disabled={i === 0}
                      />
                    </div>
                    <div className={styles.number}>
                      <b>{("0" + (i + 1)).slice(-2)}</b>
                    </div>
                    <TextInput
                      value={program.value}
                      onChange={(e) => handleProgramEdit(e, i)}
                    />
                  </div>
                ))}
              </>
            ) : (
              programs.map((program, i) => (
                <div className={styles.program} key={i}>
                  <div className={styles.number}>
                    <b>{("0" + (i + 1)).slice(-2)}</b>
                  </div>
                  <div className={styles.label}>{program.value}</div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default SystemConfigurationsLayout;
