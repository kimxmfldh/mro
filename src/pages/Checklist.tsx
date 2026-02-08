import React, { useState, useMemo } from 'react';
import { categories, users } from '../data/mockData';
import { isOverdue, formatDate, getOverdueDays } from '../utils/date';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import Input from '../components/common/Input';
import { Task } from '../types';

interface ChecklistProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
  onOpenTaskModal: () => void;
}

const Checklist: React.FC<ChecklistProps> = ({ tasks, onToggleTask, onOpenTaskModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | string>('');
  const [selectedAssignee, setSelectedAssignee] = useState<number | string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // 필터링된 업무 목록
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 관리항목 필터
      if (selectedCategory && task.categoryId !== Number(selectedCategory)) return false;

      // 담당자 필터
      if (selectedAssignee && task.assigneeId !== Number(selectedAssignee)) return false;

      // 상태 필터
      if (selectedStatus) {
        if (selectedStatus === 'completed' && !task.isChecked) return false;
        if (selectedStatus === 'pending' && (task.isChecked || isOverdue(task.dueDate, task.isChecked))) return false;
        if (selectedStatus === 'overdue' && !isOverdue(task.dueDate, task.isChecked)) return false;
      }

      // 우선순위 필터
      if (selectedPriority && task.priority !== selectedPriority) return false;

      // 검색 키워드
      if (searchKeyword && !task.title.toLowerCase().includes(searchKeyword.toLowerCase())) return false;

      return true;
    });
  }, [tasks, selectedCategory, selectedAssignee, selectedStatus, selectedPriority, searchKeyword]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryName = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.name || '';
  };

  const getUserName = (userId: number) => {
    return users.find((u) => u.id === userId)?.name || '';
  };

  const getCategoryColor = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.color || '#6B7280';
  };

  const categoryOptions = [
    { value: '', label: '전체' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  const userOptions = [
    { value: '', label: '전체' },
    ...users.map((u) => ({ value: u.id, label: u.name })),
  ];

  const statusOptions = [
    { value: '', label: '전체' },
    { value: 'completed', label: '완료' },
    { value: 'pending', label: '미완료' },
    { value: 'overdue', label: '지연' },
  ];

  const priorityOptions = [
    { value: '', label: '전체' },
    { value: '높음', label: '높음' },
    { value: '보통', label: '보통' },
    { value: '낮음', label: '낮음' },
  ];

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-end">
        <Button variant="primary" onClick={onOpenTaskModal}>
          새 업무
        </Button>
      </div>

      {/* 필터바 */}
      <Card>
        <div className="flex items-center gap-3 flex-wrap">
          <Select
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val as string)}
            options={categoryOptions}
            className="w-40"
          />
          <Select
            value={selectedAssignee}
            onChange={(val) => setSelectedAssignee(val as string)}
            options={userOptions}
            className="w-32"
          />
          <Select
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={statusOptions}
            className="w-32"
          />
          <Select
            value={selectedPriority}
            onChange={setSelectedPriority}
            options={priorityOptions}
            className="w-32"
          />
          <Input
            type="text"
            value={searchKeyword}
            onChange={setSearchKeyword}
            placeholder="업무명 검색..."
            className="w-64"
          />
        </div>
      </Card>

      {/* 업무 목록 테이블 */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary w-12"></th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">업무명</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">관리항목</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">담당자</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">마감일</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">주기</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">우선순위</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">상태</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-text-secondary">
                    조건에 맞는 업무가 없습니다.
                  </td>
                </tr>
              ) : (
                paginatedTasks.map((task) => {
                  const taskOverdue = isOverdue(task.dueDate, task.isChecked);
                  const overdueDays = getOverdueDays(task.dueDate);

                  return (
                    <tr
                      key={task.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        task.isChecked ? 'bg-gray-50' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={task.isChecked}
                          onChange={() => onToggleTask(task.id)}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-sm ${
                            task.isChecked
                              ? 'line-through text-gray-400'
                              : 'text-text-primary font-medium'
                          }`}
                        >
                          {task.title}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge color={getCategoryColor(task.categoryId)}>
                          {getCategoryName(task.categoryId)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-text-secondary">
                          {getUserName(task.assigneeId)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-sm ${
                            taskOverdue ? 'text-danger font-semibold' : 'text-text-secondary'
                          }`}
                        >
                          {formatDate(task.dueDate)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-text-secondary">{task.cycle}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge priority={task.priority}>{task.priority}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        {task.isChecked ? (
                          <Badge color="#10B981">완료</Badge>
                        ) : taskOverdue ? (
                          <Badge color="#EF4444">{overdueDays}일 지연</Badge>
                        ) : (
                          <Badge color="#6B7280">진행중</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              variant="secondary"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              이전
            </Button>
            <span className="text-sm text-text-secondary">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              다음
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Checklist;
