import React, { useState, useMemo } from 'react';
import Card from '../components/common/Card';
import { categories } from '../data/mockData';
import Badge from '../components/common/Badge';
import { Task } from '../types';

interface CategoriesProps {
  tasks: Task[];
}

const Categories: React.FC<CategoriesProps> = ({ tasks }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showInactive, setShowInactive] = useState(false);

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

  // 각 카테고리별 업무 수 계산
  const getCategoryTaskCount = (categoryId: number) => {
    return tasks.filter(t => t.categoryId === categoryId).length;
  };

  const getCategoryCompletedCount = (categoryId: number) => {
    return tasks.filter(t => t.categoryId === categoryId && t.isChecked).length;
  };

  return (
    <div className="space-y-6">
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
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
            showInactive
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-text-secondary border-border hover:bg-gray-50'
          }`}
        >
          {showInactive ? '전체 표시' : '활성만'}
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((category) => {
          const totalTasks = getCategoryTaskCount(category.id);
          const completedTasks = getCategoryCompletedCount(category.id);
          const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

          return (
            <Card key={category.id} className="hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center flex-1">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: category.color }}
                  >
                    <span className="text-white font-bold text-sm">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary truncate">{category.name}</h3>
                    <Badge color={category.isActive ? '#14B8A6' : '#9CA3AF'} className="text-xs mt-1">
                      {category.isActive ? '활성' : '비활성'}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-text-secondary line-clamp-2 mb-4 min-h-[40px]">
                {category.description}
              </p>

              {/* 통계 */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">업무</span>
                  <span className="font-semibold text-text-primary">{totalTasks}건</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-text-secondary">완료율</span>
                  <span className="font-semibold text-success">{completionRate}%</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 결과 없음 */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
