"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styles from "./FormDatePicker.module.css";

type FormDatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

export const FormDatePicker = ({
  value,
  onChange,
  error,
}: FormDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(newValue) =>
          onChange(newValue ? newValue.format("YYYY-MM-DD") : "")
        }
        format="DD.MM.YYYY"
        slotProps={{
          textField: {
            className: `${styles.input} ${error ? styles.inputError : ""}`,
          },
        }}
      />
    </LocalizationProvider>
  );
};
