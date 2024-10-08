import dayjs from "dayjs";

const formatDates = (data) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      [
        "date",
        "dateOfBirth",
        "examDate",
        "exDate",
        "paymentDate",
        "feeDate",
      ].includes(key)
        ? value
          ? dayjs(value).format("MM/DD/YYYY")
          : null
        : value,
    ])
  );
};

export default formatDates;
