const SummaryItem = ({ title, value, icon }) => {
  return (
    <div className="p-6 rounded-lg shadow-card hover:shadow-card-hover transition-shadow bg-gray-800 text-white">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-gray-700">
          <svg
            className="h-6 w-6 text-primary-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={icon}
            />
          </svg>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-400 truncate">
              {title}
            </dt>
            <dd>
              <div
                className={`text-lg font-semibold ${
                  value > 1000
                    ? "text-red-500"
                    : value > 500
                    ? "text-orange-500"
                    : "text-black"
                }`}
              >
                {value?.toLocaleString() || 0}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SummaryItem;
