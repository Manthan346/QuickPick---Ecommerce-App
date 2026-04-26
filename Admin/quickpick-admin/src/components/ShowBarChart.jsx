import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { useEffect, useState } from "react";
import { montlyIncome } from "../api";

export default function ShowBarChart() {
  const [data, setData] = useState([
    { month: "1/2026" , income: 30000},
  { month: "2/2026" , income: 10000},
{ month: "3/2026" , income: 20000},
{ month: "4/2026" , income: 40000},
{ month: "5/2026" , income: 50000},
{ month: "6/2026" , income: 60000}]);

  

  const fetchMontlyIncome = async () => {
    try {
      const res = await montlyIncome();

     
      const formatted = res.data.data.slice(0,6).map(item => ({
        month: `${item._id.month}/${item._id.year}`,
        income: item.totalIncome
      }));

      setData(formatted);
    } catch (error) {
      console.error("Error fetching monthly income:", error);
    }
  };

  useEffect(() => {
       fetchMontlyIncome();
  }, []);

  return (
   <div className="w-full  md:w-full ">
<ResponsiveContainer width="100%" height={300}>
<BarChart data={data} barCategoryGap="50%">
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="month" />
<YAxis />
<Tooltip />
<Legend />
<Bar
dataKey="income"
barSize={40}
radius={[10, 10, 0, 0]}
fill="#8884d8"
/>
</BarChart>
</ResponsiveContainer>
</div>
  );
}
