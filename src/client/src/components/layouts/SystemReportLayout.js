import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/layouts/SystemReportLayout.module.css";
import Card from "../Card";

const convertGB = (n) => {
  return (n / 1000000000).toFixed(2);
};

const SystemReportLayout = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);

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

  return isLoading ? (
    <span>Loading</span>
  ) : (
    <React.Fragment>
      <h1>SYSTEM REPORT</h1>
      <div className={styles.container}>
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
    </React.Fragment>
  );
};

export default SystemReportLayout;
