import classNames from "classnames";

interface SelectProps {
  options: { name: string; value: string }[] | string[];
  className?: string;
  getValue: Function;
  id?: string; // FIXME
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  className,
  getValue,
  id,
  placeholder,
  handleSortProducts,
}) => {
  return (
    <select
      id={id}
      onChange={(e) => {
        getValue(e.target.value);
      }}
      className={`customed-select ${classNames(className)}`}
    >
      {placeholder && (
        <option value="" disabled selected>
          {placeholder}
        </option>
      )}
      {options.map((opt, index) => {
        if (typeof opt === "string") {
          return (
            <option value={opt} key={index}>
              {opt}
            </option>
          );
        } else {
          return (
            <option value={opt.value} key={index}>
              {opt.name}
            </option>
          );
        }
      })}
    </select>
  );
};

export default Select;
