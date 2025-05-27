import { useState, useEffect, useMemo } from "react";
import DashboardSummary from "./components/dashboard/DashboardSummary";
import AdmissionOverview from "./components/dashboard/TotalApplicantsChart";
import EnrollmentByProgramChart from "./components/dashboard/EnrollmentByProgramChart";
import TrendAnalysis from "./components/dashboard/TrendAnalysis";
import axios from "axios";

const AdmissionDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [applicationDetails, setApplicationDetails] = useState();

  const parseDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? null : date;
  };
  const handleSetFilterData = () => {
    const filtereData = {
      ...data,
      summaryData: data?.summaryData[0],
      admissionData: [
        ...(data?.admissionData2021 || []),
        ...(data?.admissionData2022 || []),
        ...(data?.admissionData2023 || []),
        ...(data?.admissionData2024 || []),
        ...(data?.admissionData2025 || []),
      ],
    };
    const total = filtereData?.admissionData.reduce(
      (sum, item) => sum + item.applications,
      0
    );
    const accepted = filtereData?.admissionData.reduce(
      (sum, item) => sum + item.admissions,
      0
    );
    setApplicationDetails({
      accepted,
      total,
    });
    setFilterdData(filtereData);
  };

  const handleGetChartData = async () => {
    setIsLoading(true);
    const response = await axios.get("/mockData.json");
    if (response.data) {
      setData(response.data);
      handleSetFilterData();
    }
    setIsLoading(false);
  };
  useEffect(() => {
    handleGetChartData();
  }, []);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilterdData] = useState();

  useEffect(() => {
    if (!startDate || !endDate || startDate > endDate) {
      handleSetFilterData();
      return;
    }

    const toDateOnly = (date) => new Date(date).toISOString().slice(0, 10);

    const newFilteredData = {
      admissionData: [
        ...(data.admissionData2021 || []),
        ...(data.admissionData2022 || []),
        ...(data.admissionData2023 || []),
        ...(data.admissionData2024 || []),
        ...(data.admissionData2025 || []),
      ].filter((item) => {
        const itemDate = toDateOnly(parseDate(item.fullDate));
        return itemDate && itemDate >= startDate && itemDate <= endDate;
      }),

      enrollmentByProgram: (data.enrollmentByProgram || []).filter((item) => {
        const itemYearDate = toDateOnly(parseDate(item.year));
        return (
          itemYearDate && itemYearDate >= startDate && itemYearDate <= endDate
        );
      }),

      summaryData: (data.summaryData || []).filter((item) => {
        const itemYearDate = toDateOnly(parseDate(item.year));
        return (
          itemYearDate && itemYearDate >= startDate && itemYearDate <= endDate
        );
      }),

      trendData: (data.trendData || []).filter((item) => {
        const itemYearDate = toDateOnly(parseDate(item.year));
        return (
          itemYearDate && itemYearDate >= startDate && itemYearDate <= endDate
        );
      }),
    };

    const total = newFilteredData?.admissionData.reduce(
      (sum, item) => sum + item.applications,
      0
    );
    const accepted = newFilteredData?.admissionData.reduce(
      (sum, item) => sum + item.admissions,
      0
    );
    setApplicationDetails({
      accepted,
      total,
    });
    setFilterdData(newFilteredData);
  }, [startDate, endDate, data]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = useMemo(getTodayDate, []);
  return (
    <div className="bg-gray-900 text-white">
      <div className="p-5 mb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between">
          <h2 className="text-2xl font-bold leading-7">
            Admission Analytics Dashboard
          </h2>
          <div className="mt-3 sm:mt-0 flex space-x-3">
            <div className="flex items-center space-x-4">
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                From:
              </label>
              <input
                type="date"
                id="startDate"
                max={today}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="cursor-pointer rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm font-medium bg-gray-800 text-white border-gray-700"
              />

              <label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                To:
              </label>
              <input
                type="date"
                id="endDate"
                max={today}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="cursor-pointer rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm font-medium bg-gray-800 text-white border-gray-700"
              />
            </div>
            <button
              onClick={handleRefresh}
              className="cursor-pointer inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 transition-colors"
            >
              <svg
                className="-ml-0.5 mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582M20 20v-5h-.581M4 9a8 8 0 0113.657-5.657M20 15a8 8 0 01-13.657 5.657"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <div className="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <DashboardSummary data={applicationDetails} />
          </div>

          <div className="md:col-span-2">
            <AdmissionOverview data={filteredData?.admissionData || []} />
          </div>

          <div>
            <EnrollmentByProgramChart
              data={filteredData?.enrollmentByProgram || []}
            />
          </div>

          <div className="md:col-span-3">
            <TrendAnalysis data={filteredData?.trendData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionDashboard;
