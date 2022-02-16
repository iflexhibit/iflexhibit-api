import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Card from "../Card";
import styles from "../../styles/layouts/GeneralOverviewLayout.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const GeneralOverviewLayout = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const graphData = {
    labels: ["Posts", "Users", "Comments"],
    datasets: [
      {
        label: "Total Reports",
        data: [data.reportedPosts, data.reportedUsers, data.reportedComments],
        backgroundColor: [
          "hsla(214, 99, 35, 0.5)",
          "hsla(221, 48, 34, 0.5)",
          "hsla(210, 68, 42, 0.5)",
        ],
        borderColor: [
          "hsla(214, 99, 35, 1)",
          "hsla(221, 48, 34, 1)",
          "hsla(210, 68, 42, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 30000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("/dashboard/data/general")
      .then((response) => {
        setLoading(false);
        setData(response.data.data);
      })
      .catch(() => {
        setLoading(false);
        setData({});
        navigate("/login");
      });
  };

  const totalReports =
    data.reportedPosts + data.reportedUsers + data.reportedComments;

  return (
    !isLoading && (
      <React.Fragment>
        <h1>GENERAL OVERVIEW</h1>
        <div className={styles.container}>
          <div className={styles.graph}>
            <Card
              graph
              label="total reports"
              value={isNaN(totalReports) ? 0 : totalReports}
            >
              <Doughnut data={graphData} />
            </Card>
          </div>
          <div className={styles.cards}>
            <Card label="pending posts" value={data.pendingPosts} />
            <Card label="banned users" value={data.bannedUsers} />
            <Card label="disabled posts" value={data.disabledPosts} />
            <Card label="disabled comments" value={data.disabledComments} />
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default GeneralOverviewLayout;
