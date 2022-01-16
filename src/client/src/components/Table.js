import styles from "../styles/Table.module.css";

const Table = () => {
  const column = [
    { field: "id", label: "ID", align: "center" },
    { field: "user", label: "Posted By", align: "left" },
    { field: "title", label: "Title", align: "left" },
    { field: "createdAt", label: "Created At", align: "center" },
  ];
  const row = [
    {
      id: 1,
      user: "sosig69",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 2,
      user: "sosig69",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 3,
      user: "sosig69",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 4,
      user: "sosig69",
      title: "Through the Lens",
      createdAt: new Date().toLocaleString(),
    },
  ];
  return (
    <div className={styles.table}>
      <div className={styles.header}>
        {column.map((c) => (
          <div key={c.field} className={styles.label}>
            {c.label}
          </div>
        ))}
      </div>
      <div className={styles.body}>
        {row.map((r, i) => (
          <div key={i} className={styles.row}>
            {column.map((c, i) => (
              <div key={i} className={styles.data}>
                {r[c.field]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
