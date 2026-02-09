import React, { useState, useMemo } from 'react';
import { categories, users, companies } from '../data/mockData';
import { isOverdue, formatDate, getOverdueDays } from '../utils/date';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import FilterModal from '../components/FilterModal';
import ContextMenu from '../components/ContextMenu';
import { Filter, X } from 'lucide-react';
import { Task } from '../types';

interface ChecklistProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
  onOpenTaskModal: () => void;
  onEditTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const Checklist: React.FC<ChecklistProps> = ({ tasks, onToggleTask, onOpenTaskModal, onEditTask, onDeleteTask }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; taskId: number } | null>(null);
  const [filters, setFilters] = useState({
    companies: [] as number[],
    categories: [] as number[],
    assignees: [] as number[],
    statuses: [] as string[],
    priorities: [] as string[],
  });
  const itemsPerPage = 20;

  // 필터링된 업무 목록
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 업체 필터
      if (filters.companies.length > 0 && !filters.companies.includes(task.companyId)) return false;

      // 관리항목 필터
      if (filters.categories.length > 0 && !filters.categories.includes(task.categoryId)) return false;

      // 담당자 필터
      if (filters.assignees.length > 0 && !filters.assignees.includes(task.assigneeId)) return false;

      // 상태 필터
      if (filters.statuses.length > 0) {
        const taskOverdue = isOverdue(task.dueDate, task.isChecked);
        if (filters.statuses.includes('completed') && !task.isChecked) return false;
        if (filters.statuses.includes('pending') && (task.isChecked || taskOverdue)) return false;
        if (filters.statuses.includes('overdue') && !taskOverdue) return false;
        if (!filters.statuses.includes('completed') && task.isChecked) return false;
        if (!filters.statuses.includes('pending') && !task.isChecked && !taskOverdue) return false;
        if (!filters.statuses.includes('overdue') && taskOverdue) return false;
      }

      // 우선순위 필터
      if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority)) return false;

      // 검색 키워드
      if (searchKeyword && !task.title.toLowerCase().includes(searchKeyword.toLowerCase())) return false;

      return true;
    });
  }, [tasks, filters, searchKeyword]);

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

  const getCompanyName = (companyId: number) => {
    return companies.find((c) => c.id === companyId)?.name || '';
  };

  const removeFilter = (type: string, value: number | string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev].filter((v: any) => v !== value)
    }));
  };

  const hasActiveFilters =
    filters.companies.length > 0 ||
    filters.categories.length > 0 ||
    filters.assignees.length > 0 ||
    filters.statuses.length > 0 ||
    filters.priorities.length > 0;

  const handleContextMenu = (e: React.MouseEvent, taskId: number) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, taskId });
  };

  const handleEdit = (taskId: number) => {
    onEditTask(taskId);
  };

  const handleDelete = (taskId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onDeleteTask(taskId);
      setContextMenu(null);
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* 검색 및 필터 */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="업무 검색..."
            className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
            hasActiveFilters
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-text-secondary border-border hover:bg-gray-50'
          }`}
        >
          <Filter size={18} />
          필터
          {hasActiveFilters && (
            <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-xs">
              {filters.companies.length + filters.categories.length + filters.assignees.length + filters.statuses.length + filters.priorities.length}
            </span>
          )}
        </button>
      </div>

      {/* 선택된 필터 칩 */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          {filters.companies.map(id => (
            <div key={`company-${id}`} className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">
              <span>{getCompanyName(id)}</span>
              <button onClick={() => removeFilter('companies', id)} className="hover:bg-primary/20 rounded">
                <X size={14} />
              </button>
            </div>
          ))}
          {filters.categories.map(id => (
            <div key={`category-${id}`} className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">
              <span>{getCategoryName(id)}</span>
              <button onClick={() => removeFilter('categories', id)} className="hover:bg-primary/20 rounded">
                <X size={14} />
              </button>
            </div>
          ))}
          {filters.assignees.map(id => (
            <div key={`assignee-${id}`} className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">
              <span>{getUserName(id)}</span>
              <button onClick={() => removeFilter('assignees', id)} className="hover:bg-primary/20 rounded">
                <X size={14} />
              </button>
            </div>
          ))}
          {filters.statuses.map(status => (
            <div key={`status-${status}`} className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">
              <span>{status === 'completed' ? '완료' : status === 'pending' ? '미완료' : '지연'}</span>
              <button onClick={() => removeFilter('statuses', status)} className="hover:bg-primary/20 rounded">
                <X size={14} />
              </button>
            </div>
          ))}
          {filters.priorities.map(priority => (
            <div key={`priority-${priority}`} className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">
              <span>{priority}</span>
              <button onClick={() => removeFilter('priorities', priority)} className="hover:bg-primary/20 rounded">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 업무 목록 테이블 */}
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider w-12"></th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">업무명</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">업체</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">관리항목</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">담당자</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">마감일</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">주기</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">우선순위</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-text-secondary text-sm">
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
                      onContextMenu={(e) => handleContextMenu(e, task.id)}
                      className={`border-b border-border hover:bg-gray-50 transition-colors cursor-pointer ${
                        task.isChecked ? 'bg-gray-50/50' : ''
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
                        <Badge color="#3B82F6">
                          {getCompanyName(task.companyId)}
                        </Badge>
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

        {/* 하단 영역 - 페이지네이션 + 업무 추가 */}
        <div className="border-t border-border bg-gray-50">
          <div className="flex items-center justify-between px-4 py-3">
            {/* 업무 추가 버튼 */}
            <button
              onClick={onOpenTaskModal}
              className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-2"
            >
              <span className="text-lg font-light">+</span>
              <span>업무 추가</span>
            </button>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors"
                >
                  이전
                </button>
                <span className="text-sm text-text-secondary">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors"
                >
                  다음
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* 필터 모달 */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={setFilters}
        initialFilters={filters}
      />

      {/* 컨텍스트 메뉴 */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onEdit={() => handleEdit(contextMenu.taskId)}
          onDelete={() => handleDelete(contextMenu.taskId)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default Checklist;
