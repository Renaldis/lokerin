export default function CardJobType({ res }) {
  const colorStatus =
    res.job_status === 1
      ? "text-green-500 font-semibold"
      : "text-red-500 font-semibold";
  let statusClassess = `px-4 py-1 bg-sky-200 rounded-md lg:text-sm ${colorStatus}`;
  let cardClassess = `px-4 py-1 bg-sky-200 rounded-md lg:text-sm`;

  const Type = () => {
    return (
      res.job_type && <span className={cardClassess}>Type: {res.job_type}</span>
    );
  };
  const Tenure = () => {
    return (
      res.job_tenure && (
        <span className={cardClassess}>Tenure: {res.job_tenure}</span>
      )
    );
  };
  const Status = () => {
    let data = res.job_status;
    const status = data == 1 ? "Open" : "Closed";
    return res.job_tenure && <p className={statusClassess}>Status: {status}</p>;
  };
  return (
    <div className="mt-3 w-[100%] flex flex-wrap items-center gap-2">
      <Type />
      <Tenure />
      <Status />
    </div>
  );
}
