import React from 'react';
import Card from '../components/common/Card';
import { categories } from '../data/mockData';
import Badge from '../components/common/Badge';

const Categories: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">관리항목</h1>
          <p className="text-sm text-text-secondary mt-1">업무를 분류하는 관리 항목을 관리합니다</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{ backgroundColor: category.color }}
                >
                  <span className="text-white font-bold text-sm">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{category.name}</h3>
                  <Badge color={category.isActive ? '#14B8A6' : '#9CA3AF'} className="text-xs mt-1">
                    {category.isActive ? '활성' : '비활성'}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-text-secondary line-clamp-2">
              {category.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
