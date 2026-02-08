import { User, Category, Task, Activity, Company } from '../types';
import { format, subDays, addDays } from 'date-fns';

// 업체 데이터
export const companies: Company[] = [
  { id: 1, name: '소렌티(주)', code: 'SRT', industry: '물류/유통', isActive: true },
  { id: 2, name: 'HK세미텍', code: 'HKS', industry: '제조', isActive: true },
  { id: 3, name: '케이엠테크', code: 'KMT', industry: 'IT/서비스', isActive: true },
  { id: 4, name: '대한물산', code: 'DHS', industry: '무역', isActive: true },
  { id: 5, name: '신성엔지니어링', code: 'SSE', industry: '건설/엔지니어링', isActive: true },
];

// 사용자 데이터
export const users: User[] = [
  { id: 1, name: '김관리', email: 'admin@example.com', role: 'admin', department: '총무팀' },
  { id: 2, name: '이담당', email: 'staff1@example.com', role: 'staff', department: 'IT팀' },
  { id: 3, name: '박직원', email: 'staff2@example.com', role: 'staff', department: '시설팀' },
  { id: 4, name: '최조회', email: 'viewer@example.com', role: 'viewer', department: '경영지원팀' },
];

// 관리 항목 데이터 (21개) - 미니멀 그레이 톤
export const categories: Category[] = [
  { id: 1, name: '자산', description: '자산(기기, 가구, 비품 등) 관리', color: '#3F3F46', sortOrder: 1, isActive: true },
  { id: 2, name: '문서', description: '사내규정, 문서 수발신, 계약, 공문, 문서함 관리, ABTC 신청/갱신/관리', color: '#52525B', sortOrder: 2, isActive: true },
  { id: 3, name: 'IT', description: 'PC, 모니터, 서버, SW, 보안, 네트워크, ERP, 계정/도메인, 복합기, 홈페이지, 전화, MS365 등 관리', color: '#18181B', sortOrder: 3, isActive: true },
  { id: 4, name: '차량', description: '차량 점검, 정비', color: '#27272A', sortOrder: 4, isActive: true },
  { id: 5, name: '비품/사무용품', description: '문구류, A4용지, 피복 등 관리', color: '#71717A', sortOrder: 5, isActive: true },
  { id: 6, name: '식대/간식', description: '식대, 간식, 커피, 정수기 관리', color: '#52525B', sortOrder: 6, isActive: true },
  { id: 7, name: '전기', description: '전기 점검, 관리, 전기세 지출결의', color: '#3F3F46', sortOrder: 7, isActive: true },
  { id: 8, name: '시설물', description: '시설물(냉난방기 등) 정비, 유지보수, 오수처리시설, 수질검사, 청소 관리', color: '#18181B', sortOrder: 8, isActive: true },
  { id: 9, name: '소방', description: '소방 점검, 관리', color: '#DC2626', sortOrder: 9, isActive: true },
  { id: 10, name: '인증', description: 'ISO 9001 등 품질·경영 인증의 유지 및 정기 갱신 대응', color: '#52525B', sortOrder: 10, isActive: true },
  { id: 11, name: '보안', description: '캠스 출입통제, CCTV 관리, 출입증, 차단기, 보안감사 대응', color: '#27272A', sortOrder: 11, isActive: true },
  { id: 12, name: '공사', description: '시설, 보수, 인테리어 공사 관리', color: '#3F3F46', sortOrder: 12, isActive: true },
  { id: 13, name: '부동산', description: '임대 관리', color: '#71717A', sortOrder: 13, isActive: true },
  { id: 14, name: '행사', description: '행사 운영', color: '#52525B', sortOrder: 14, isActive: true },
  { id: 15, name: '현장 자재 구매', description: '라벨지, 리본, PLT, 공업용 랩, 박스, PP밴드, 테이프, 비닐, 방청제, 에어필터, 흡입필터, 아답터 소켓 등', color: '#3F3F46', sortOrder: 15, isActive: true },
  { id: 16, name: '지출 결의', description: '각종 대금 지출결의', color: '#18181B', sortOrder: 16, isActive: true },
  { id: 17, name: '법인카드 관리', description: '소렌티 법인카드 관리', color: '#71717A', sortOrder: 17, isActive: true },
  { id: 18, name: '보험', description: '화재보험, 지게차보험, 상해보험, 자동차보험', color: '#52525B', sortOrder: 18, isActive: true },
  { id: 19, name: '용역 관리', description: '용역 투입현황관리, 용역비 정산, HK 세미텍 선별 용역비 정산', color: '#27272A', sortOrder: 19, isActive: true },
  { id: 20, name: 'CS', description: '소렌티 3PL CS', color: '#3F3F46', sortOrder: 20, isActive: true },
  { id: 21, name: '기타', description: '영업, 구매, 인사, 재경 업무 외 일체', color: '#71717A', sortOrder: 21, isActive: true },
];

// 업무 데이터 (다양한 상태) - companyId 추가
const today = new Date();
export const tasks: Task[] = [
  // 오늘 마감 업무
  { id: 1, companyId: 1, categoryId: 3, title: 'MS365 라이선스 갱신', assigneeId: 2, cycle: '연간', priority: '높음', dueDate: format(today, 'yyyy-MM-dd'), isChecked: false },
  { id: 2, companyId: 2, categoryId: 1, title: '사무실 책상 구매 검토', assigneeId: 1, cycle: '수시', priority: '보통', dueDate: format(today, 'yyyy-MM-dd'), isChecked: false },
  { id: 3, companyId: 1, categoryId: 9, title: '소방시설 월간 점검', assigneeId: 3, cycle: '매월', priority: '높음', dueDate: format(today, 'yyyy-MM-dd'), isChecked: true, checkedAt: format(today, 'yyyy-MM-dd HH:mm:ss'), checkedBy: 3 },

  // 지연된 업무
  { id: 4, companyId: 3, categoryId: 7, title: '전기세 지출 결의', assigneeId: 1, cycle: '매월', priority: '높음', dueDate: format(subDays(today, 3), 'yyyy-MM-dd'), isChecked: false },
  { id: 5, companyId: 2, categoryId: 11, title: 'CCTV 점검 및 녹화 확인', assigneeId: 3, cycle: '매주', priority: '보통', dueDate: format(subDays(today, 1), 'yyyy-MM-dd'), isChecked: false },
  { id: 6, companyId: 1, categoryId: 4, title: '차량 정기 점검 (소렌티 1호차)', assigneeId: 3, cycle: '분기', priority: '높음', dueDate: format(subDays(today, 5), 'yyyy-MM-dd'), isChecked: false },

  // 내일 마감
  { id: 7, companyId: 4, categoryId: 2, title: '계약서 검토 및 날인', assigneeId: 1, cycle: '수시', priority: '높음', dueDate: format(addDays(today, 1), 'yyyy-MM-dd'), isChecked: false },
  { id: 8, companyId: 2, categoryId: 5, title: 'A4 용지 재고 확인 및 발주', assigneeId: 2, cycle: '매월', priority: '낮음', dueDate: format(addDays(today, 1), 'yyyy-MM-dd'), isChecked: false },

  // 일주일 내
  { id: 9, companyId: 3, categoryId: 10, title: 'ISO 9001 내부 심사 준비', assigneeId: 1, cycle: '반기', priority: '높음', dueDate: format(addDays(today, 3), 'yyyy-MM-dd'), isChecked: false },
  { id: 10, companyId: 1, categoryId: 8, title: '냉난방기 필터 교체', assigneeId: 3, cycle: '분기', priority: '보통', dueDate: format(addDays(today, 5), 'yyyy-MM-dd'), isChecked: false },
  { id: 11, companyId: 5, categoryId: 6, title: '정수기 필터 교체', assigneeId: 3, cycle: '분기', priority: '보통', dueDate: format(addDays(today, 7), 'yyyy-MM-dd'), isChecked: true, checkedAt: format(today, 'yyyy-MM-dd HH:mm:ss'), checkedBy: 3 },

  // 이번 달
  { id: 12, companyId: 4, categoryId: 12, title: '회의실 인테리어 공사 견적 검토', assigneeId: 1, cycle: '수시', priority: '낮음', dueDate: format(addDays(today, 10), 'yyyy-MM-dd'), isChecked: false },
  { id: 13, companyId: 1, categoryId: 14, title: '워크샵 장소 예약 및 준비', assigneeId: 2, cycle: '수시', priority: '보통', dueDate: format(addDays(today, 15), 'yyyy-MM-dd'), isChecked: false },
  { id: 14, companyId: 2, categoryId: 16, title: '11월 용역비 지출 결의', assigneeId: 1, cycle: '매월', priority: '높음', dueDate: format(addDays(today, 20), 'yyyy-MM-dd'), isChecked: false },
  { id: 15, companyId: 3, categoryId: 18, title: '화재보험 갱신 검토', assigneeId: 1, cycle: '연간', priority: '보통', dueDate: format(addDays(today, 25), 'yyyy-MM-dd'), isChecked: false },

  // 완료된 업무
  { id: 16, companyId: 1, categoryId: 3, title: '서버 백업 확인', assigneeId: 2, cycle: '매일', priority: '높음', dueDate: format(subDays(today, 1), 'yyyy-MM-dd'), isChecked: true, checkedAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'), checkedBy: 2 },
  { id: 17, companyId: 2, categoryId: 5, title: '사무용품 발주', assigneeId: 2, cycle: '매월', priority: '낮음', dueDate: format(subDays(today, 2), 'yyyy-MM-dd'), isChecked: true, checkedAt: format(subDays(today, 2), 'yyyy-MM-dd HH:mm:ss'), checkedBy: 2 },
  { id: 18, companyId: 3, categoryId: 15, title: '현장 소모품 재고 확인', assigneeId: 3, cycle: '매주', priority: '보통', dueDate: format(subDays(today, 3), 'yyyy-MM-dd'), isChecked: true, checkedAt: format(subDays(today, 3), 'yyyy-MM-dd HH:mm:ss'), checkedBy: 3 },
  { id: 19, companyId: 4, categoryId: 17, title: '법인카드 사용 내역 정리', assigneeId: 1, cycle: '매월', priority: '보통', dueDate: format(subDays(today, 5), 'yyyy-MM-dd'), isChecked: true, checkedAt: format(subDays(today, 5), 'yyyy-MM-dd HH:mm:ss'), checkedBy: 1 },
  { id: 20, companyId: 2, categoryId: 19, title: '용역 투입 현황 보고서 작성', assigneeId: 2, cycle: '매월', priority: '높음', dueDate: format(subDays(today, 7), 'yyyy-MM-dd'), isChecked: true, checkedAt: format(subDays(today, 7), 'yyyy-MM-dd HH:mm:ss'), checkedBy: 2 },

  // 미래 업무
  { id: 21, companyId: 5, categoryId: 13, title: '부동산 임대차 계약 갱신 협의', assigneeId: 1, cycle: '연간', priority: '높음', dueDate: format(addDays(today, 30), 'yyyy-MM-dd'), isChecked: false },
  { id: 22, companyId: 1, categoryId: 20, title: 'CS 고객 불만 처리 프로세스 개선', assigneeId: 2, cycle: '수시', priority: '보통', dueDate: format(addDays(today, 45), 'yyyy-MM-dd'), isChecked: false },
  { id: 23, companyId: 3, categoryId: 21, title: '연말 정산 준비', assigneeId: 1, cycle: '연간', priority: '높음', dueDate: format(addDays(today, 60), 'yyyy-MM-dd'), isChecked: false },
];

// 최근 활동 데이터
export const recentActivities: Activity[] = [
  { id: 1, action: '완료', userName: '박직원', taskTitle: '정수기 필터 교체', timestamp: format(today, 'yyyy-MM-dd HH:mm') },
  { id: 2, action: '완료', userName: '박직원', taskTitle: '소방시설 월간 점검', timestamp: format(today, 'yyyy-MM-dd HH:mm') },
  { id: 3, action: '완료', userName: '이담당', taskTitle: '서버 백업 확인', timestamp: format(subDays(today, 1), 'yyyy-MM-dd HH:mm') },
  { id: 4, action: '완료', userName: '이담당', taskTitle: '사무용품 발주', timestamp: format(subDays(today, 2), 'yyyy-MM-dd HH:mm') },
  { id: 5, action: '등록', userName: '김관리', taskTitle: 'MS365 라이선스 갱신', timestamp: format(subDays(today, 3), 'yyyy-MM-dd HH:mm') },
];
