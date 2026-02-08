import React, { useState } from 'react';
import Modal from './common/Modal';
import Input from './common/Input';
import Select from './common/Select';
import Button from './common/Button';
import { categories, users, companies } from '../data/mockData';
import { TaskCycle, TaskPriority } from '../types';
import { format } from 'date-fns';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: {
    companyId: number;
    title: string;
    categoryId: number;
    assigneeId: number;
    cycle: TaskCycle;
    priority: TaskPriority;
    dueDate: string;
    notes: string;
  }) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const [companyId, setCompanyId] = useState<number>(1);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [assigneeId, setAssigneeId] = useState<number>(1);
  const [cycle, setCycle] = useState<TaskCycle>('수시');
  const [priority, setPriority] = useState<TaskPriority>('보통');
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [notes, setNotes] = useState('');

  const cycleOptions: TaskCycle[] = ['매일', '매주', '매월', '분기', '반기', '연간', '수시'];
  const priorityOptions: { value: TaskPriority; color: string }[] = [
    { value: '높음', color: '#EF4444' },
    { value: '보통', color: '#F59E0B' },
    { value: '낮음', color: '#6B7280' },
  ];

  const companySelectOptions = companies
    .filter((c) => c.isActive)
    .map((c) => ({ value: c.id, label: c.name }));

  const categorySelectOptions = categories
    .filter((c) => c.isActive)
    .map((c) => ({ value: c.id, label: c.name }));

  const userSelectOptions = users.map((u) => ({ value: u.id, label: u.name }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('업무명을 입력해주세요.');
      return;
    }

    onSave({
      companyId: Number(companyId),
      title: title.trim(),
      categoryId: Number(categoryId),
      assigneeId: Number(assigneeId),
      cycle,
      priority,
      dueDate,
      notes: notes.trim(),
    });

    // Reset form
    setCompanyId(1);
    setTitle('');
    setCategoryId(1);
    setAssigneeId(1);
    setCycle('수시');
    setPriority('보통');
    setDueDate(format(new Date(), 'yyyy-MM-dd'));
    setNotes('');
  };

  const handleClose = () => {
    setCompanyId(1);
    setTitle('');
    setCategoryId(1);
    setAssigneeId(1);
    setCycle('수시');
    setPriority('보통');
    setDueDate(format(new Date(), 'yyyy-MM-dd'));
    setNotes('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="새 업무 등록">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 업체 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            관리 업체 <span className="text-danger">*</span>
          </label>
          <Select
            value={companyId}
            onChange={(val) => setCompanyId(Number(val))}
            options={companySelectOptions}
            className="w-full"
          />
        </div>

        {/* 업무명 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            업무명 <span className="text-danger">*</span>
          </label>
          <Input
            type="text"
            value={title}
            onChange={setTitle}
            placeholder="업무명을 입력하세요"
            className="w-full"
            required
          />
        </div>

        {/* 관리 항목 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            관리 항목 <span className="text-danger">*</span>
          </label>
          <Select
            value={categoryId}
            onChange={(val) => setCategoryId(Number(val))}
            options={categorySelectOptions}
            className="w-full"
          />
        </div>

        {/* 담당자 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            담당자 <span className="text-danger">*</span>
          </label>
          <Select
            value={assigneeId}
            onChange={(val) => setAssigneeId(Number(val))}
            options={userSelectOptions}
            className="w-full"
          />
        </div>

        {/* 반복 주기 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            반복 주기 <span className="text-danger">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {cycleOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCycle(option)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  cycle === option
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 우선순위 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            우선순위 <span className="text-danger">*</span>
          </label>
          <div className="flex gap-2">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPriority(option.value)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  priority === option.value ? 'text-white' : 'bg-gray-100 text-text-secondary'
                }`}
                style={{
                  backgroundColor: priority === option.value ? option.color : undefined,
                }}
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>

        {/* 마감일 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            마감일 <span className="text-danger">*</span>
          </label>
          <Input
            type="date"
            value={dueDate}
            onChange={setDueDate}
            className="w-full"
            required
          />
        </div>

        {/* 비고 */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">비고/메모</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="추가 메모를 입력하세요"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
            취소
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            저장
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
