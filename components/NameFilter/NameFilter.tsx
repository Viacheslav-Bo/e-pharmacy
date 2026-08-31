"use client";

import { useState } from "react";
import { Button } from "@/components/Button/Button";
import styles from "./NameFilter.module.css";

type NameFilterProps = {
  placeholder?: string;
  onFilter: (name: string) => void;
};

export const NameFilter = ({
  placeholder = "User Name",
  onFilter,
}: NameFilterProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log("filter submit:", value);
    onFilter(value.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.input}
      />
      <Button type="submit" className={styles.filterBtn}>
        <svg width="16" height="16">
          <use href="/sprite.svg#filter" />
        </svg>
        Filter
      </Button>
    </form>
  );
};
