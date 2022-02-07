import styles from "../styles/Select.module.css";

const Select = ({ options, onChange, value }) => {
  return (
    <div className={`${styles["select"]}`}>
      <select value={value} onChange={onChange}>
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
