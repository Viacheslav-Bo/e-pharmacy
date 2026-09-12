export const formatDateForInput = (dateStr?: string) =>
  dateStr ? dateStr.split("T")[0] : "";

export const formatDateForBackend = (dateStr: string) =>
  dateStr ?
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  : "";
