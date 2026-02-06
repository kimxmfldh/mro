import React from 'react';
import Card from '../components/common/Card';
import { tasks, categories } from '../data/mockData';
import ProgressBar from '../components/common/ProgressBar';
import { BarChart3, TrendingUp, CheckCircle2 } from 'lucide-react';

const Statistics: React.FC = () => {
  // 전체 통계
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isChecked).length;
  const completionRate = ((completedTasks / totalTasks) * 100).toFixed(1);

  // 관리항목별 통계
  const categoryStats = categories.map((cat) => {
    const catTasks = tasks.filter((t) => t.categoryId === cat.id);
    const catCompleted = catTasks.filter((t) => t.isChecked).length;
    const catTotal = catTasks.length;
    const percentage = catTotal > 0 ? ((catCompleted / catTotal) * 100).toFixed(1) : '0';

    return {
      category: cat,
      completed: catCompleted,
      total: catTotal,
      percentage: parseFloat(percentage),
    };
  }).filter(stat => stat.total > 0)
    .sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">통계</h1>
        <p className="text-sm text-text-secondary mt-1">업무 처리 현황과 통계를 확인합니다</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">전체 업무</p>
              <p className="text-3xl font-bold text-text-primary">{totalTasks}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <BarChart3 size={24} className="text-text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">완료</p>
              <p className="text-3xl font-bold text-success">{completedTasks}</p>
            </div>
            <div className="bg-success/10 p-3 rounded-lg">
              <CheckCircle2 size={24} className="text-success" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">완료율</p>
              <p className="text-3xl font-bold text-primary">{completionRate}%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp size={24} className="text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Category Statistics */}
      <Card title="관리항목별 통계">
        <div className="space-y-4">
          {categoryStats.map((stat) => (
            <div key={stat.category.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: stat.category.color }}
                  />
                  <span className="text-sm font-medium text-text-primary">
                    {stat.category.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-secondary">
                    {stat.completed} / {stat.total}
                  </span>
                  <span className="text-sm font-semibold text-text-primary min-w-[48px] text-right">
                    {stat.percentage}%
                  </span>
                </div>
              </div>
              <ProgressBar value={stat.percentage} color={stat.category.color} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Statistics;
