import { Card } from '@/components/ui-library';
import { useEffect } from "react";
import useTodoStore from '@/hooks/useToDoStore';

const Stats = () => {
  const { stats, fetchStats } = useTodoStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (!stats) {
    return <p>Loading stats...</p>;
  }

  return (
    
    <Card className="p-6 flex flex-col gap-6 bg-gray-50 rounded-lg shadow-lg">
    {/* Average time to finish tasks */}
    <Card className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Average Time to Finish Tasks:
      </h3>
      <p className="text-2xl text-gray-800">
        {stats.averageTime}
      </p>
    </Card>

    {/* Average time to finish tasks by priority */}
    <Card className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Average Time to Finish Tasks by Priority:
      </h3>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span className="text-gray-600">Low:</span>
          <span className="text-gray-800">{stats.averageTimeLowPriority}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-600">Medium:</span>
          <span className="text-gray-800">{stats.averageTimeMediumPriority}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-600">High:</span>
          <span className="text-gray-800">{stats.averageTimeHighPriority}</span>
        </li>
      </ul>
    </Card>
  </Card>
  )
}

export default Stats