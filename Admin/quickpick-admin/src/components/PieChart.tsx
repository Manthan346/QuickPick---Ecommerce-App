import { useAuth } from "../Context/AuthContext";
import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  Sector,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

// Custom label
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
  value,
}: PieLabelRenderProps) => {
  if (!cx || !cy || !outerRadius) return null;

  const radius = outerRadius + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {name}: {value} ({((percent ?? 0) * 100).toFixed(0)}%)
    </text>
  );
};

export default function PieChartWithCustomizedLabel() {
  // ✅ Hook INSIDE component
  const { dashboardStats } = useAuth();

  const data = [
    { name: "Delivered", value: dashboardStats.delivered },
    { name: "Shipped", value: dashboardStats.shipped },
    { name: "Placed", value: dashboardStats.placed },
    { name: "Cancelled", value: dashboardStats.cancelled },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={renderCustomizedLabel}
          labelLine
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}