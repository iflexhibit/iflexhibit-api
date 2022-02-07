import styles from "../styles/Table.module.css";
import React from "react";
import Select from "./Select";
import IconButton from "./IconButton";
import PlusIcon from "./icons/PlusIcon";
import ExternalIcon from "./icons/ExternalIcon";

const Table = ({ columns, rows, controls, options }) => {
  return (
    <div className={styles.table}>
      {controls && (
        <div className={styles.controls}>
          <h2>{controls}</h2>
          <Select options={options} />
        </div>
      )}
      <div className={styles.header}>
        {columns.map((c) => (
          <div
            key={c.field}
            className={`${styles.label} ${c.size ? styles[c.size] : ""}`}
          >
            {c.label}
          </div>
        ))}
      </div>
      <div className={styles.body}>
        {rows.map((r, i) => (
          <div key={i} className={styles.row}>
            {columns.map((c, i) => (
              <div
                key={i}
                className={`${styles.data} ${c.size ? styles[c.size] : ""} ${
                  styles[c.align]
                }`}
              >
                {r[c.field] ? (
                  c.hidden ? (
                    c.external ? (
                      <IconButton
                        icon={<ExternalIcon />}
                        variant="outlined"
                        href={r[c.field]}
                      />
                    ) : (
                      <IconButton
                        icon={<PlusIcon />}
                        variant="outlined"
                        onClick={() => c.buttonClick(r)}
                      />
                    )
                  ) : (
                    r[c.field]
                  )
                ) : (
                  "-"
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
