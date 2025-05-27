import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const EnrollmentByProgramChart = ({ data }) => {
  const COLORS = ['#0A84FF', '#2AC4B3', '#FF9F0A', '#34C759', '#5E5CE6', '#FF3B30', '#FFCC00'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = data?.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="chart-tooltip bg-gray-800 border border-gray-700 p-2 rounded text-white">
          <p className="font-medium">{`${payload[0].payload.name}`}</p>
          <p className="text-primary-500 font-semibold">
            {`${payload[0].value} students (${percentage}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  const total = data?.reduce((sum, item) => sum + item.value, 0);
  const mostPopular = data?.sort((a, b) => b.value - a.value)[0];

  return (
    <div className="rounded-lg shadow-card p-6 h-full bg-gray-800 text-white">
      <h3 className="text-lg font-medium mb-4">Application per Program</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <XAxis dataKey="name" tick={{ fill: '#ccc', fontSize: 12 }} />
            <YAxis tick={{ fill: '#ccc', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => <span className="text-sm text-gray-300">{value}</span>}
            />
            <Bar dataKey="value" name="Enrolled Students" radius={[4, 4, 0, 0]}>
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <div className="text-sm text-gray-400">
          Total Enrollment: <span className="font-semibold text-primary-500">{total}</span>
        </div>
        <p className="text-sm mt-2 text-gray-400">
          {mostPopular?.name} is the most popular program with {mostPopular?.value} students enrolled.
        </p>
      </div>
    </div>
  );
};

export default EnrollmentByProgramChart;
