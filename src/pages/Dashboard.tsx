import React, { useState } from 'react';
import { tasks, categories, users, recentActivities } from '../data/mockData';
import { isOverdue, getDDay, getOverdueDays } from '../utils/date';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import { LayoutGrid, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface DashboardProps {
  allTasks: Task[];
  onToggleTask: (taskId: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ allTasks, onToggleTask }) => {
  // 요약 통계
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.isChecked).length;
  const pendingTasks = allTasks.filter((t) => !t.isChecked).length;
  const overdueTasks = allTasks.filter((t) => isOverdue(t.dueDate, t.isChecked)).length;

  // 오늘의 업무
  const todayTasks = allTasks.filter((t) => getDDay(t.dueDate) === 0);

  // 지연된 업무
  const overdueTasksList = allTasks.filter((t) => isOverdue(t.dueDate, t.isChecked));

  // 관리항목별 진행률
  const categoryProgress = categories.map((cat) => {
    const catTasks = allTasks.filter((t) => t.categoryId === cat.id);
    const catCompleted = catTasks.filter((t) => t.isChecked).length;
    const catTotal = catTasks.length;
    const percentage = catTotal > 0 ? (catCompleted / catTotal) * 100 : 0;

    return {
      category: cat,
      completed: catCompleted,
      total: catTotal,
      percentage,
    };
  });

  const summaryCards = [
    { title: '전체 업무', value: totalTasks, icon: LayoutGrid, color: 'bg-gray-700' },
    { title: '완료', value: completedTasks, icon: CheckCircle, color: 'bg-success' },
    { title: '미완료', value: pendingTasks, icon: Clock, color: 'bg-gray-500' },
    { title: '지연', value: overdueTasks, icon: AlertCircle, color: 'bg-danger' },
  ];

  const getCategoryName = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.name || '';
  };

  const getUserName = (userId: number) => {
    return users.find((u) => u.id === userId)?.name || '';
  };

  const getCategoryColor = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.color || '#6B7280';
  };

  return (
    <div className="space-y-8">
      {/* 요약 카드 */}
      <div className="grid grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <Card key={card.title} className="relative overflow-hidden hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">{card.title}</p>
                <p className="text-3xl font-bold text-text-primary">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon size={20} className="text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 중앙 영역 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 관리항목별 진행률 */}
        <Card title="관리항목별 진행률" className="h-[500px] overflow-y-auto">
          <div className="space-y-4">
            {categoryProgress.map((item) => (
              <div key={item.category.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.category.color }}
                    />
                    <span className="text-sm font-medium text-text-primary">
                      {item.category.name}
                    </span>
                  </div>
                  <span className="text-sm text-text-secondary">
                    {item.completed}/{item.total}
                  </span>
                </div>
                <ProgressBar value={item.percentage} color={item.category.color} />
              </div>
            ))}
          </div>
        </Card>

        {/* 오늘의 업무 */}
        <Card title="오늘의 업무" className="h-[500px] overflow-y-auto">
          {todayTasks.length === 0 ? (
            <p className="text-text-secondary text-center py-8">오늘 마감인 업무가 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start p-3 border border-border rounded-lg hover:border-gray-300 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={task.isChecked}
                    onChange={() => onToggleTask(task.id)}
                    className="mt-1 mr-3 w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.isChecked ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge color={getCategoryColor(task.categoryId)}>
                        {getCategoryName(task.categoryId)}
                      </Badge>
                      <span className="text-xs text-text-secondary">
                        {getUserName(task.assigneeId)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* 하단 영역 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 지연 경고 */}
        <Card title="지연 경고" className="h-[300px] overflow-y-auto">
          {overdueTasksList.length === 0 ? (
            <p className="text-text-secondary text-center py-8">지연된 업무가 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {overdueTasksList.map((task) => (
                <div
                  key={task.id}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{task.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge color={getCategoryColor(task.categoryId)}>
                          {getCategoryName(task.categoryId)}
                        </Badge>
                        <span className="text-xs text-danger font-semibold">
                          {getOverdueDays(task.dueDate)}일 지연
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* 최근 활동 */}
        <Card title="최근 활동" className="h-[300px] overflow-y-auto">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">{activity.userName}</span>님이{' '}
                    <span className="font-medium">{activity.taskTitle}</span> 업무를{' '}
                    <span className="text-primary font-medium">{activity.action}</span>했습니다.
                  </p>
                  <p className="text-xs text-text-secondary mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
