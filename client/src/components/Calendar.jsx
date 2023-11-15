import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Calendar() {
  const [selected, setSelected] = useState(null);
  const defaultMonth = new Date(2023, 10);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>{format(selected, "PP")}</p>;
  }

  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
        defaultMonth={defaultMonth}
        fromMonth={defaultMonth}
        toDate={new Date(2023, 12)}
      />
    </div>
  );
}
