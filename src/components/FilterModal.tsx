import React, { useState } from 'react';
import Modal from './common/Modal';
import Button from './common/Button';
import { companies, categories, users } from '../data/mockData';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    companies: number[];
    categories: number[];
    assignees: number[];
    statuses: string[];
    priorities: string[];
  }) => void;
  initialFilters: {
    companies: number[];
    categories: number[];
    assignees: number[];
    statuses: string[];
    priorities: string[];
  };
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, initialFilters }) => {
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>(initialFilters.companies);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(initialFilters.categories);
  const [selectedAssignees, setSelectedAssignees] = useState<number[]>(initialFilters.assignees);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(initialFilters.statuses);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(initialFilters.priorities);

  const toggleItem = <T,>(array: T[], item: T, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const handleApply = () => {
    onApply({
      companies: selectedCompanies,
      categories: selectedCategories,
      assignees: selectedAssignees,
      statuses: selectedStatuses,
      priorities: selectedPriorities,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedCompanies([]);
    setSelectedCategories([]);
    setSelectedAssignees([]);
    setSelectedStatuses([]);
    setSelectedPriorities([]);
  };

  const statuses = [
    { value: 'completed', label: '완료' },
    { value: 'pending', label: '미완료' },
    { value: 'overdue', label: '지연' },
  ];

  const priorities = ['높음', '보통', '낮음'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="필터" maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* 업체 */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">업체</h3>
          <div className="flex flex-wrap gap-2">
            {companies.filter(c => c.isActive).map((company) => (
              <button
                key={company.id}
                onClick={() => toggleItem(selectedCompanies, company.id, setSelectedCompanies)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCompanies.includes(company.id)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {company.name}
              </button>
            ))}
          </div>
        </div>

        {/* 관리항목 */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">관리항목</h3>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
            {categories.filter(c => c.isActive).map((category) => (
              <button
                key={category.id}
                onClick={() => toggleItem(selectedCategories, category.id, setSelectedCategories)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategories.includes(category.id)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 담당자 */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">담당자</h3>
          <div className="flex flex-wrap gap-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => toggleItem(selectedAssignees, user.id, setSelectedAssignees)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedAssignees.includes(user.id)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>

        {/* 상태 */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">상태</h3>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => toggleItem(selectedStatuses, status.value, setSelectedStatuses)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatuses.includes(status.value)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* 우선순위 */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">우선순위</h3>
          <div className="flex flex-wrap gap-2">
            {priorities.map((priority) => (
              <button
                key={priority}
                onClick={() => toggleItem(selectedPriorities, priority, setSelectedPriorities)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedPriorities.includes(priority)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button type="button" variant="secondary" onClick={handleReset} className="flex-1">
            초기화
          </Button>
          <Button type="button" variant="primary" onClick={handleApply} className="flex-1">
            적용
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
