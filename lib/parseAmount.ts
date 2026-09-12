export const parseAmount = (
  value: number | string | undefined | null,
): number => {
  if (value === undefined || value === null) {
    return 0;
  }

  if (typeof value === "number") {
    return value;
  }

  const cleaned = value.replace(/[^0-9.-]+/g, "");

  const parsed = Number(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};
