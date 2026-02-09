import React, { useState, useMemo } from 'react';
import Card from '../components/common/Card';
import { categories } from '../data/mockData';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import { Filter } from 'lucide-react';
import { Task } from '../types';

interface CategoriesProps {
  tasks: Task[];
}

const Categories: React.FC<CategoriesProps> = ({ tasks }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // 필터링된 카테고리
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      // 활성/비활성 필터
      if (!showInactive && !category.isActive) return false;

      // 검색 키워드
      if (searchKeyword && !category.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          !category.description.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [searchKeyword, showInactive]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 각 카테고리별 업무 수 계산
  const getCategoryTaskCount = (categoryId: number) => {
    return tasks.filter(t => t.categoryId === categoryId).length;
  };

  const getCategoryCompletedCount = (categoryId: number) => {
    return tasks.filter(t => t.categoryId === categoryId && t.isChecked).length;
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* 검색 및 필터 */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="관리항목 검색..."
            className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <button
          onClick={() => setShowInactive(!showInactive)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
            showInactive
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-text-secondary border-border hover:bg-gray-50'
          }`}
        >
          <Filter size={18} />
          {showInactive ? '전체' : '활성만'}
        </button>
      </div>

      {/* 테이블 */}
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">관리항목</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">설명</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider w-32">업무 수</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider w-48">완료율</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider w-24">상태</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-text-secondary text-sm">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                paginatedCategories.map((category) => {
                  const totalTasks = getCategoryTaskCount(category.id);
                  const completedTasks = getCategoryCompletedCount(category.id);
                  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

                  return (
                    <tr
                      key={category.id}
                      className="border-b border-border hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          >
                            <span className="text-white font-bold text-xs">
                              {category.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-text-primary">
                            {category.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-text-secondary line-clamp-2">
                          {category.description}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-text-primary font-medium">
                          {totalTasks}건
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <ProgressBar value={completionRate} color={category.color} className="flex-1" />
                          <span className="text-sm font-semibold text-text-primary w-12 text-right">
                            {completionRate}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge color={category.isActive ? '#14B8A6' : '#9CA3AF'}>
                          {category.isActive ? '활성' : '비활성'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 하단 영역 - 관리항목 추가 + 페이지네이션 */}
        <div className="border-t border-border bg-gray-50">
          <div className="flex items-center justify-between px-4 py-3">
            {/* 관리항목 추가 버튼 */}
            <button
              onClick={() => alert('관리항목 추가 기능은 준비 중입니다.')}
              className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-2"
            >
              <span className="text-lg font-light">+</span>
              <span>관리항목 추가</span>
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
    </div>
  );
};

export default Categories;
