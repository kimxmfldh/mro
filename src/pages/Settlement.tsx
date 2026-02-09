import React, { useState, useMemo } from 'react';
import Card from '../components/common/Card';
import { companies, categories } from '../data/mockData';
import { Task } from '../types';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface SettlementProps {
  tasks: Task[];
}

// 정산 단가 (데모용)
const SETTLEMENT_PRICES = {
  자산: 50000,
  문서: 30000,
  IT: 80000,
  차량: 40000,
  '비품/사무용품': 25000,
  '식대/간식': 20000,
  전기: 35000,
  시설물: 70000,
  소방: 60000,
  인증: 100000,
  보안: 75000,
  공사: 150000,
  부동산: 90000,
  행사: 55000,
  '현장 자재 구매': 45000,
  '지출 결의': 30000,
  '법인카드 관리': 25000,
  보험: 85000,
  '용역 관리': 95000,
  CS: 65000,
  기타: 40000,
};

const Settlement: React.FC<SettlementProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCompanyId, setSelectedCompanyId] = useState<number>(1);

  // 현재 월의 시작/끝
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // 선택된 업체 및 월의 완료된 업무
  const completedTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (task.companyId !== selectedCompanyId) return false;
      if (!task.isChecked) return false;

      const taskDate = new Date(task.dueDate);
      return taskDate >= monthStart && taskDate <= monthEnd;
    });
  }, [tasks, selectedCompanyId, monthStart, monthEnd]);

  // 관리항목별 집계
  const categoryStats = useMemo(() => {
    const stats = new Map<number, { category: any; count: number; amount: number }>();

    completedTasks.forEach((task) => {
      const category = categories.find(c => c.id === task.categoryId);
      if (!category) return;

      const price = SETTLEMENT_PRICES[category.name as keyof typeof SETTLEMENT_PRICES] || 0;

      if (stats.has(task.categoryId)) {
        const current = stats.get(task.categoryId)!;
        current.count += 1;
        current.amount += price;
      } else {
        stats.set(task.categoryId, {
          category,
          count: 1,
          amount: price,
        });
      }
    });

    return Array.from(stats.values()).sort((a, b) => b.amount - a.amount);
  }, [completedTasks]);

  const totalAmount = categoryStats.reduce((sum, stat) => sum + stat.amount, 0);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* 상단 컨트롤 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* 업체 선택 */}
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(Number(e.target.value))}
            className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {companies.filter(c => c.isActive).map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          {/* 월 선택 */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-text-secondary" />
            </button>
            <div className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-semibold min-w-[140px] text-center">
              {format(currentDate, 'yyyy년 M월')}
            </div>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
            <button
              onClick={handleToday}
              className="px-3 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-lg transition-colors"
            >
              이번 달
            </button>
          </div>
        </div>

        {/* 다운로드 버튼 */}
        <button
          onClick={() => alert('정산서 다운로드 기능은 준비 중입니다.')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Download size={18} />
          정산서 다운로드
        </button>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-all">
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">완료 업무</p>
            <p className="text-2xl font-bold text-text-primary">{completedTasks.length}건</p>
          </div>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">총 정산 금액</p>
            <p className="text-2xl font-bold text-primary">{totalAmount.toLocaleString()}원</p>
          </div>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">관리항목</p>
            <p className="text-2xl font-bold text-text-primary">{categoryStats.length}개</p>
          </div>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">평균 단가</p>
            <p className="text-2xl font-bold text-text-primary">
              {completedTasks.length > 0 ? Math.round(totalAmount / completedTasks.length).toLocaleString() : 0}원
            </p>
          </div>
        </Card>
      </div>

      {/* 정산 내역 테이블 */}
      <Card className="flex-1 overflow-hidden flex flex-col" title={`${selectedCompany?.name} 정산 내역`}>
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">관리항목</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">완료 건수</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">단가</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">금액</th>
              </tr>
            </thead>
            <tbody>
              {categoryStats.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-text-secondary text-sm">
                    완료된 업무가 없습니다.
                  </td>
                </tr>
              ) : (
                <>
                  {categoryStats.map((stat) => {
                    const unitPrice = SETTLEMENT_PRICES[stat.category.name as keyof typeof SETTLEMENT_PRICES] || 0;
                    return (
                      <tr
                        key={stat.category.id}
                        className="border-b border-border hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: stat.category.color }}
                            />
                            <span className="text-sm font-medium text-text-primary">
                              {stat.category.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-text-primary">{stat.count}건</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-text-secondary">
                            {unitPrice.toLocaleString()}원
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-semibold text-text-primary">
                            {stat.amount.toLocaleString()}원
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {/* 합계 */}
                  <tr className="border-t-2 border-border bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-text-primary" colSpan={3}>
                      합계
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-lg font-bold text-primary">
                        {totalAmount.toLocaleString()}원
                      </span>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

function subMonths(date: Date, amount: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() - amount);
  return newDate;
}

function addMonths(date: Date, amount: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + amount);
  return newDate;
}

export default Settlement;
