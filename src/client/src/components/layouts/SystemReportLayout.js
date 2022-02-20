import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/layouts/SystemReportLayout.module.css";
import Card from "../Card";
import Button from "../Button";
import Select from "../Select";
import Modal from "../Modal";
import { jsPDF } from "jspdf";

const convertGB = (n) => {
  return (n / 1000000000).toFixed(2);
};

const lineHeight = 10;
const pageMargin = 10;
const pageWidth = 210 - 20;
const pageHeight = 297 - 20;

const doc = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: [pageWidth, pageHeight],
});

doc.setFontSize(10);

const SystemReportLayout = () => {
  const LOG_TYPES = [
    { value: 1, label: "Last 24 hours" },
    { value: 7, label: "Last 7 days" },
    { value: 30, label: "Last 30 days" },
    { value: 0, label: "All" },
  ];
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isLogLoading, setLogLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [logType, setLogType] = useState(LOG_TYPES[0].value);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`/dashboard/data/system`)
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch(() => {
        setLoading(false);
        setData({});
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generatePDF = (logs) => {
    let startX = pageMargin;
    let startY = pageMargin + 5;

    doc.text(
      `Logs: ${LOG_TYPES.find((log) => log.value == logType).label} | Lines: ${
        logs.length
      } | Date: ${new Date().toISOString()}\n`,
      pageMargin,
      pageMargin
    );

    function createText(timestamp, level, message, line) {
      let splitMessage = doc.splitTextToSize(
        message,
        pageWidth - pageMargin - startX
      );
      if (startY >= pageHeight - lineHeight) {
        doc.addPage();
        startY = pageMargin; // Restart height position
      }
      doc.text(`Line: ${line} - ${timestamp} --- ${level}`, startX, startY);
      doc.text(splitMessage, startX + 5, startY + lineHeight / 2.5);
      startY += (lineHeight + (lineHeight * splitMessage.length) / 1.75) / 1.5;
    }

    logs.forEach((log, index) => {
      createText(log.timestamp, log.level, log.message, index + 1);
    });

    doc.save(`logs-${new Date().toISOString()}.pdf`);
  };

  const fetchLogs = () => {
    setLogLoading(true);
    axios
      .get(`/dashboard/data/logs/${logType}`)
      .then((response) => {
        generatePDF(response.data.logs);
      })
      .catch(() => {
        window.alert("Something went wrong.");
        window.location.reload();
      })
      .finally(() => {
        setLogLoading(false);
        setModalOpen(false);
      });
  };

  return isLoading ? (
    <span>Loading</span>
  ) : (
    <React.Fragment>
      <h1>SYSTEM REPORT</h1>
      <div className={styles.container}>
        <Button
          label="logs"
          color="blue"
          variant="contained"
          onClick={() => setModalOpen(true)}
        />
        <div className={styles.cards}>
          <Card label="stored images" value={data.imageCount} />
          <Card
            label="images consumed space (gb)"
            value={convertGB(data.imageBytes)}
          />
          <Card label="stored videos" value={data.videoCount} />
          <Card
            label="videos consumed space (gb)"
            value={convertGB(data.videoBytes)}
          />
          <Card label="total rows in database" value={data.rows} />
        </div>
      </div>
      {modalOpen && (
        <Modal
          narrow
          closeModal={() => setModalOpen(false)}
          label={<h1>Generate Logs</h1>}
        >
          <div className={styles.log}>
            <Select
              options={LOG_TYPES}
              value={logType}
              onChange={(e) => setLogType(e.target.value)}
              fullWidth
            />
            <Button
              label={isLogLoading ? "generating" : "generate"}
              color="blue"
              variant="contained"
              fullWidth
              onClick={fetchLogs}
              disabled={isLogLoading}
            />
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default SystemReportLayout;
