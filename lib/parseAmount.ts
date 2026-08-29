export const parseAmount = (value: number | string): number =>
  typeof value === "number" ? value : (
    Number(value.replace(/,/g, "").replace(/^\+/, ""))
  );
