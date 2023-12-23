import { ChangeEvent, useState } from "react";

export default function useInput(defaultValue = "") {
  const [value, setvalue] = useState(defaultValue);
  const onValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setvalue(event.target.value);
  };
  return {value, onChange: onValueChangeHandler};
}
