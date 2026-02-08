import React from 'react';
import { categories, users, companies } from '../data/mockData';
import { isOverdue, getDDay, getOverdueDays } from '../utils/date';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { Building2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface DashboardProps {
  allTasks: Task[];
  onToggleTask: (taskId: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ allTasks, onToggleTask }) => {

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
      {/* 업체별 섹션 */}
      {companies.filter(c => c.isActive).map((company) => {
        // 각 업체별 업무 필터링 (실제로는 업무에 companyId가 있어야 하지만, 데모용으로 업무를 나눠서 표시)
        const companyTasksCount = Math.floor(allTasks.length / companies.filter(c => c.isActive).length);
        const startIdx = (company.id - 1) * companyTasksCount;
        const companyTasks = allTasks.slice(startIdx, startIdx + companyTasksCount);

        const totalTasks = companyTasks.length;
        const completedTasks = companyTasks.filter((t) => t.isChecked).length;
        const pendingTasks = companyTasks.filter((t) => !t.isChecked).length;
        const overdueTasks = companyTasks.filter((t) => isOverdue(t.dueDate, t.isChecked)).length;
        const todayTasks = companyTasks.filter((t) => getDDay(t.dueDate) === 0);
        const overdueTasksList = companyTasks.filter((t) => isOverdue(t.dueDate, t.isChecked));

        return (
          <div key={company.id} className="space-y-6">
            {/* 업체 헤더 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <Building2 size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">{company.name}</h2>
                <p className="text-sm text-text-secondary">{company.industry}</p>
              </div>
            </div>

            {/* 요약 카드 */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">전체</p>
                    <p className="text-2xl font-bold text-text-primary">{totalTasks}</p>
                  </div>
                  <div className="bg-gray-100 p-2.5 rounded-lg">
                    <Clock size={18} className="text-text-secondary" />
                  </div>
                </div>
              </Card>
              <Card className="hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">완료</p>
                    <p className="text-2xl font-bold text-success">{completedTasks}</p>
                  </div>
                  <div className="bg-success/10 p-2.5 rounded-lg">
                    <CheckCircle size={18} className="text-success" />
                  </div>
                </div>
              </Card>
              <Card className="hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">미완료</p>
                    <p className="text-2xl font-bold text-text-primary">{pendingTasks}</p>
                  </div>
                  <div className="bg-gray-100 p-2.5 rounded-lg">
                    <Clock size={18} className="text-text-secondary" />
                  </div>
                </div>
              </Card>
              <Card className="hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">지연</p>
                    <p className="text-2xl font-bold text-danger">{overdueTasks}</p>
                  </div>
                  <div className="bg-danger/10 p-2.5 rounded-lg">
                    <AlertCircle size={18} className="text-danger" />
                  </div>
                </div>
              </Card>
            </div>

            {/* 업무 현황 */}
            <div className="grid grid-cols-2 gap-6">
              {/* 오늘의 업무 */}
              <Card title="오늘의 업무">
                {todayTasks.length === 0 ? (
                  <p className="text-text-secondary text-center py-4 text-sm">오늘 마감인 업무가 없습니다.</p>
                ) : (
                  <div className="space-y-2">
                    {todayTasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start p-2.5 border border-border rounded-lg hover:border-gray-300 transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={task.isChecked}
                          onChange={() => onToggleTask(task.id)}
                          className="mt-1 mr-2.5 w-4 h-4 text-primary focus:ring-primary border-border rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${task.isChecked ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
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

              {/* 지연 경고 */}
              <Card title="지연 경고">
                {overdueTasksList.length === 0 ? (
                  <p className="text-text-secondary text-center py-4 text-sm">지연된 업무가 없습니다.</p>
                ) : (
                  <div className="space-y-2">
                    {overdueTasksList.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="p-2.5 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <p className="text-sm font-medium text-text-primary truncate">{task.title}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge color={getCategoryColor(task.categoryId)}>
                            {getCategoryName(task.categoryId)}
                          </Badge>
                          <span className="text-xs text-danger font-semibold">
                            {getOverdueDays(task.dueDate)}일 지연
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* 구분선 */}
            {company.id < companies.filter(c => c.isActive).length && (
              <div className="border-t border-border my-8"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
