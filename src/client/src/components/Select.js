import styles from "../styles/Select.module.css";

const Select = ({ id, options, onChange, value, fullWidth }) => {
  return (
    <div
      className={`${styles["select"]} ${fullWidth ? styles["fullWidth"] : ""}`}
    >
      <select id={id} name={id} value={value} onChange={onChange}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
