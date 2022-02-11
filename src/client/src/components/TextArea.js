import styles from "../styles/TextArea.module.css";
import PropTypes from "prop-types";

const TextArea = ({
  id,
  value,
  onChange,
  placeholder,
  autoFocus,
  fullHeight,
}) => {
  const handleResize = (e) => {
    if (e.target.scrollHeight >= 136) return;
    e.target.style.height = "";
    e.target.style.height = e.target.scrollHeight + "px";
  };
  return (
    <textarea
      className={`${styles["textarea"]} ${
        fullHeight ? styles["fullHeight"] : ""
      }`}
      onInput={handleResize}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
};

TextArea.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoFocus: PropTypes.bool,
  fullHeight: PropTypes.bool,
};

TextArea.defaultProps = {
  id: "",
  value: "",
  onChange: () => {},
  placeholder: "",
  autoFocus: false,
  fullHeight: false,
};

export default TextArea;
