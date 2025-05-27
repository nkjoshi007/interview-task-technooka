import SummaryItem from "./SummaryItem";

const DashboardSummary = ({ data }) => {
  const summaryItems = [
    {
      title: "Total Applicants",
      value: data?.total,
      change: data?.total,
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      title: "Verified Applicants",
      value: data?.accepted,
      change: data?.accepted,
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    },
    {
      title: "Rejected Applicants",
      value: (data?.total - data?.accepted),
      change: data?.total - data?.accepted,
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-4 lg:grid-cols-3">
      {summaryItems.map((item, index) => (
        <SummaryItem
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default DashboardSummary;
