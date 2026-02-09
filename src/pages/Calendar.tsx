import React, { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Task } from '../types';
import { categories, companies, users } from '../data/mockData';
import { isOverdue } from '../utils/date';

interface CalendarProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ tasks, onToggleTask }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 현재 월의 달력 날짜들 생성
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const dateArray = useMemo(() => {
    const dates: Date[] = [];
    let day = startDate;

    while (day <= endDate) {
      dates.push(day);
      day = addDays(day, 1);
    }

    return dates;
  }, [startDate, endDate]);

  // 특정 날짜의 업무 가져오기
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.dueDate), date));
  };

  // 날짜별 업무 우선순위 통계
  const getTaskStats = (date: Date) => {
    const dateTasks = getTasksForDate(date);
    return {
      total: dateTasks.length,
      high: dateTasks.filter(t => t.priority === '높음').length,
      medium: dateTasks.filter(t => t.priority === '보통').length,
      low: dateTasks.filter(t => t.priority === '낮음').length,
      completed: dateTasks.filter(t => t.isChecked).length,
      overdue: dateTasks.filter(t => isOverdue(t.dueDate, t.isChecked)).length,
    };
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  const getCategoryName = (categoryId: number) => categories.find(c => c.id === categoryId)?.name || '';
  const getCategoryColor = (categoryId: number) => categories.find(c => c.id === categoryId)?.color || '#6B7280';
  const getCompanyName = (companyId: number) => companies.find(c => c.id === companyId)?.name || '';
  const getUserName = (userId: number) => users.find(u => u.id === userId)?.name || '';

  return (
    <div className="h-full flex flex-col gap-4">
      {/* 상단 컨트롤 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-text-primary">
            {format(currentDate, 'yyyy년 M월', { locale: ko })}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-text-secondary" />
            </button>
            <button
              onClick={handleToday}
              className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-lg transition-colors"
            >
              오늘
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* 캘린더 그리드 */}
        <Card className="col-span-9 flex flex-col overflow-hidden">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 border-b border-border">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
              <div
                key={day}
                className={`py-3 text-center text-sm font-semibold ${
                  i === 0 ? 'text-danger' : i === 6 ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-7 auto-rows-fr min-h-full">
              {dateArray.map((date, i) => {
                const stats = getTaskStats(date);
                const isCurrentMonth = isSameMonth(date, currentDate);
                const isTodayDate = isToday(date);
                const isSelected = selectedDate && isSameDay(date, selectedDate);

                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`border-b border-r border-border p-2 cursor-pointer transition-all min-h-[100px] ${
                      !isCurrentMonth ? 'bg-gray-50/50' : 'hover:bg-gray-50'
                    } ${isSelected ? 'bg-primary/5 ring-2 ring-primary ring-inset' : ''}`}
                  >
                    <div className="flex flex-col h-full">
                      <div
                        className={`text-sm font-medium mb-2 ${
                          isTodayDate
                            ? 'w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center'
                            : !isCurrentMonth
                            ? 'text-text-tertiary'
                            : i % 7 === 0
                            ? 'text-danger'
                            : i % 7 === 6
                            ? 'text-primary'
                            : 'text-text-primary'
                        }`}
                      >
                        {format(date, 'd')}
                      </div>

                      {stats.total > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {stats.high > 0 && (
                            <div className="w-2 h-2 bg-danger rounded-full" title={`높음 ${stats.high}개`}></div>
                          )}
                          {stats.medium > 0 && (
                            <div className="w-2 h-2 bg-warning rounded-full" title={`보통 ${stats.medium}개`}></div>
                          )}
                          {stats.low > 0 && (
                            <div className="w-2 h-2 bg-gray-400 rounded-full" title={`낮음 ${stats.low}개`}></div>
                          )}
                          {stats.completed > 0 && (
                            <div className="w-2 h-2 bg-success rounded-full" title={`완료 ${stats.completed}개`}></div>
                          )}
                        </div>
                      )}

                      {stats.total > 0 && (
                        <div className="mt-auto">
                          <span className="text-xs text-text-tertiary">{stats.total}건</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 선택된 날짜의 업무 목록 */}
        <Card className="col-span-3 flex flex-col overflow-hidden">
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            {selectedDate ? format(selectedDate, 'M월 d일 (E)', { locale: ko }) : '날짜를 선택하세요'}
          </h3>

          {selectedDate && selectedDateTasks.length === 0 ? (
            <p className="text-text-secondary text-center py-8 text-sm">업무가 없습니다.</p>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
              {selectedDateTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 border border-border rounded-lg hover:border-gray-300 transition-all"
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={task.isChecked}
                      onChange={() => onToggleTask(task.id)}
                      className="mt-1 w-4 h-4 text-primary focus:ring-primary border-border rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium mb-2 ${task.isChecked ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                        {task.title}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge color="#3B82F6" className="text-xs">
                          {getCompanyName(task.companyId)}
                        </Badge>
                        <Badge color={getCategoryColor(task.categoryId)} className="text-xs">
                          {getCategoryName(task.categoryId)}
                        </Badge>
                        <Badge priority={task.priority} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="text-xs text-text-secondary mt-1.5">
                        {getUserName(task.assigneeId)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
