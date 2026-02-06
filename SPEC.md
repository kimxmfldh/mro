# MRO 통합 관리 시스템 개발 명세서

## 프로젝트 개요

기업의 시설·설비를 유지·보수·운영하는 MRO(Maintenance, Repair, Operations) 업무를 통합 관리하는 사내 웹 애플리케이션을 개발한다.
현재 총무 + IT 관리 업무를 단일 플랫폼에서 체계적으로 관리할 수 있도록 한다.

## 기술 스택

- Frontend: React + TypeScript + Tailwind CSS
- Backend: Node.js (Express) + TypeScript
- DB: PostgreSQL
- ORM: Prisma
- 인증: JWT 기반
- 알림: 이메일 (nodemailer)

> 기술 스택은 협의 후 변경 가능. 위는 기본 제안.

---

## 사용자 역할

| 역할 | 권한 |
|------|------|
| 관리자 (Admin) | 모든 기능 + 사용자 관리 + 관리항목 설정 + 통계 |
| 담당자 | 체크리스트 처리, 업무 등록/수정, 캘린더, 본인 업무 관리 |
| 조회자 | 대시보드, 체크리스트 조회만 가능 (수정 불가) |

---

## 데이터베이스 스키마

### categories (관리 항목)

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,          -- 항목명 (자산, 문서, IT 등)
  description TEXT,                      -- 해당 업무 설명
  color VARCHAR(7) DEFAULT '#6B7280',   -- 표시 색상 (#HEX)
  sort_order INT DEFAULT 0,             -- 표시 순서
  is_active BOOLEAN DEFAULT true,       -- 활성화 여부
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**기본 데이터 (21개 항목):**

| name | description |
|------|-------------|
| 자산 | 자산(기기, 가구, 비품 등) 관리 |
| 문서 | 사내규정, 문서 수발신, 계약, 공문, 문서함 관리, ABTC 신청/갱신/관리 |
| IT | PC, 모니터, 서버, SW, 보안, 네트워크, ERP, 계정/도메인, 복합기, 홈페이지, 전화, MS365 등 관리 |
| 차량 | 차량 점검, 정비 |
| 비품/사무용품 | 문구류, A4용지, 피복 등 관리 |
| 식대/간식 | 식대, 간식, 커피, 정수기 관리 |
| 전기 | 전기 점검, 관리, 전기세 지출결의 |
| 시설물 | 시설물(냉난방기 등) 정비, 유지보수, 오수처리시설, 수질검사, 청소 관리 |
| 소방 | 소방 점검, 관리 |
| 인증 | ISO 9001 등 품질·경영 인증의 유지 및 정기 갱신 대응 |
| 보안 | 캠스 출입통제, CCTV 관리, 출입증, 차단기, 보안감사 대응 |
| 공사 | 시설, 보수, 인테리어 공사 관리 |
| 부동산 | 임대 관리 |
| 행사 | 행사 운영 |
| 현장 자재 구매 | 라벨지, 리본, PLT, 공업용 랩, 박스, PP밴드, 테이프, 비닐, 방청제, 에어필터, 흡입필터, 아답터 소켓 등 |
| 지출 결의 | 각종 대금 지출결의 |
| 법인카드 관리 | 소렌티 법인카드 관리 |
| 보험 | 화재보험, 지게차보험, 상해보험, 자동차보험 |
| 용역 관리 | 용역 투입현황관리, 용역비 정산, HK 세미텍 선별 용역비 정산 |
| CS | 소렌티 3PL CS |
| 기타 | 영업, 구매, 인사, 재경 업무 외 일체 |

### tasks (업무)

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES categories(id),
  title VARCHAR(200) NOT NULL,           -- 업무명
  assignee_id INT REFERENCES users(id),  -- 담당자
  cycle VARCHAR(20) NOT NULL,            -- 반복주기: 매일/매주/매월/분기/반기/연간/수시
  priority VARCHAR(10) NOT NULL,         -- 우선순위: 높음/보통/낮음
  due_date DATE NOT NULL,                -- 마감일
  is_checked BOOLEAN DEFAULT false,      -- 완료 여부
  checked_at TIMESTAMP,                  -- 완료 일시
  checked_by INT REFERENCES users(id),   -- 완료자
  notes TEXT,                            -- 비고/메모
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### task_history (업무 이력)

```sql
CREATE TABLE task_history (
  id SERIAL PRIMARY KEY,
  task_id INT NOT NULL REFERENCES tasks(id),
  action VARCHAR(20) NOT NULL,           -- 등록/수정/완료/취소/삭제
  changed_by INT REFERENCES users(id),   -- 변경자
  old_value JSONB,                       -- 변경 전 값
  new_value JSONB,                       -- 변경 후 값
  created_at TIMESTAMP DEFAULT NOW()
);
```

### task_attachments (첨부파일)

```sql
CREATE TABLE task_attachments (
  id SERIAL PRIMARY KEY,
  task_id INT NOT NULL REFERENCES tasks(id),
  filename VARCHAR(255) NOT NULL,
  filepath VARCHAR(500) NOT NULL,
  filesize INT,
  uploaded_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### task_comments (댓글)

```sql
CREATE TABLE task_comments (
  id SERIAL PRIMARY KEY,
  task_id INT NOT NULL REFERENCES tasks(id),
  user_id INT NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### notifications (알림)

```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  task_id INT REFERENCES tasks(id),
  user_id INT NOT NULL REFERENCES users(id),
  type VARCHAR(20) NOT NULL,             -- D-7/D-3/D-1/D-Day/지연/시스템
  title VARCHAR(200) NOT NULL,
  message TEXT,
  channel VARCHAR(20) DEFAULT 'app',     -- 이메일/슬랙/앱푸시
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMP DEFAULT NOW()
);
```

### users (사용자)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'staff',  -- admin/staff/viewer
  department VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 화면 및 기능 명세

### 1. 사이드바 (공통 레이아웃)

- 좌측 고정 사이드바, 상단에 로고/시스템명
- 메뉴 항목:
  - 대시보드 (`/dashboard`)
  - 체크리스트 (`/checklist`)
  - 캘린더 (`/calendar`)
  - 관리 항목 설정 (`/categories`) — Admin만 표시
  - 통계/보고서 (`/reports`)
  - 설정 (`/settings`) — Admin만 표시
- 하단에 로그인 사용자 이름, 로그아웃 버튼
- 우측 상단에 알림 벨 아이콘 (읽지 않은 알림 수 배지)

### 2. 대시보드 (`/dashboard`)

**상단 영역 — 요약 카드 4개 (한 줄 배치)**
- 전체 업무 수 (파란색)
- 완료 수 (초록색)
- 미완료 수 (노란색)
- 지연 수 (빨간색) — 마감일 초과 & 미완료

**중앙 좌측 — 관리항목별 진행률**
- 21개 항목별 프로그레스바 리스트
- 각 항목: 색상 도트 + 항목명 + 완료/전체 숫자 + 프로그레스바
- 항목 클릭 시 해당 항목의 체크리스트로 이동

**중앙 우측 — 오늘의 업무**
- 오늘 마감인 업무 카드 목록
- 각 카드: 체크박스 + 업무명 + 관리항목 뱃지 + 담당자
- 체크박스 클릭으로 바로 완료 처리 가능

**하단 좌측 — 지연 경고**
- 마감 초과된 업무 목록 (빨간색 배경)
- 지연일수 표시 (예: "3일 지연")

**하단 우측 — 최근 활동**
- 최근 완료/등록/수정 이력 5건
- 타임라인 형식: 시간 + 사용자 + 행위 + 업무명

### 3. 체크리스트 (`/checklist`)

**상단 — 필터바**
- 관리항목 드롭다운 (전체 + 21개 항목)
- 담당자 드롭다운
- 상태 드롭다운 (전체/완료/미완료/지연)
- 우선순위 드롭다운 (전체/높음/보통/낮음)
- 기간 선택 (시작일~종료일)
- 검색 입력창 (업무명 키워드)
- 우측에 "+ 새 업무" 버튼

**메인 — 업무 목록 테이블**
- 컬럼: 체크박스 | 업무명 | 관리항목 (색상 뱃지) | 담당자 | 마감일 | 주기 | 우선순위 (색상 뱃지) | 상태
- 체크박스 클릭으로 완료/미완료 토글
- 완료된 항목은 취소선 + 연한 배경
- 지연된 항목은 마감일 빨간색 표시 + "N일 지연" 뱃지
- 업무명 클릭 시 업무 상세 페이지로 이동
- 컬럼 헤더 클릭으로 정렬 (마감일순, 우선순위순 등)
- 페이지네이션 (20건 단위)

**하단 — 일괄 처리바 (업무 선택 시 나타남)**
- "N건 선택됨" 텍스트
- 일괄 완료 버튼
- 일괄 담당자 변경 버튼
- 일괄 마감일 변경 버튼

### 4. 업무 등록/수정 모달

"+ 새 업무" 버튼 클릭 시 또는 기존 업무 수정 시 모달로 열림.

**입력 필드:**
- 업무명 (텍스트, 필수)
- 관리 항목 (드롭다운, 필수) — 활성화된 카테고리 목록
- 담당자 (드롭다운, 필수) — 활성 사용자 목록
- 반복 주기 (버튼 그룹, 필수) — 매일/매주/매월/분기/반기/연간/수시
- 우선순위 (버튼 그룹, 필수) — 높음(빨강)/보통(노랑)/낮음(회색)
- 마감일 (날짜 피커, 필수) — 반복 주기 선택 시 다음 마감일 자동 계산하여 제안
- 비고/메모 (텍스트 영역, 선택)
- 첨부파일 (파일 업로드, 선택) — 드래그 앤 드롭 지원, 복수 파일 가능

**하단 버튼:** 저장 / 취소

**저장 시 동작:**
- tasks 테이블에 INSERT 또는 UPDATE
- task_history에 등록/수정 이력 기록
- 담당자에게 알림 발송 (새 업무 배정 시)

### 5. 업무 상세 페이지 (`/tasks/:id`)

**상단 — 업무 정보**
- 업무명 (큰 글씨)
- 관리항목 뱃지, 우선순위 뱃지, 주기 뱃지
- 담당자, 마감일, 생성일
- 상태 표시 (미완료/완료/지연)
- 큰 체크 버튼: 완료/미완료 토글

**우측 상단 — 액션 버튼**
- 수정 (모달 열림)
- 삭제 (확인 다이얼로그 후 삭제)
- 복제 (동일한 업무 새로 생성)

**중앙 — 비고/메모 영역**
- 등록된 메모 표시
- 인라인 수정 가능

**중앙 — 첨부파일 목록**
- 파일명, 크기, 업로드일, 다운로드 버튼
- 추가 업로드 버튼

**하단 — 처리 이력 (타임라인)**
- task_history 기반
- 시간순 정렬 (최신순)
- 각 이력: 날짜시간 + 사용자 + 행위 + 변경 내역

**하단 — 댓글 영역**
- 댓글 목록 (사용자명 + 시간 + 내용)
- 댓글 입력창 + 등록 버튼

### 6. 캘린더 (`/calendar`)

**상단 — 컨트롤**
- 월간/주간 뷰 토글 버튼
- 이전/다음 월(주) 이동 버튼
- "오늘" 버튼
- 관리항목 필터 드롭다운
- 담당자 필터 드롭다운

**월간 뷰**
- 달력 그리드 (7열 x 5~6행)
- 각 날짜 칸에 업무 수 표시 (색상 도트로 우선순위 구분)
  - 빨강 도트: 높음
  - 노랑 도트: 보통
  - 회색 도트: 낮음
  - 초록 도트: 완료
- 날짜 칸 클릭 시 해당 날짜의 업무 목록 팝업

**주간 뷰**
- 7일 타임라인 형식
- 각 요일에 업무 카드 나열
- 업무 카드: 업무명 + 관리항목 뱃지 + 체크 상태

### 7. 관리 항목 설정 (`/categories`) — Admin 전용

**메인 — 항목 목록**
- 카드 리스트 형식
- 각 카드: 색상 바 + 항목명 + 설명 + 업무 수 + 활성/비활성 토글
- 드래그 앤 드롭으로 순서 변경 가능

**우측 상단 — "+ 새 항목" 버튼**

**항목 추가/수정 모달:**
- 항목명 (텍스트, 필수)
- 설명 (텍스트 영역)
- 색상 (컬러 피커)
- 활성화 토글
- 저장/취소 버튼

### 8. 통계/보고서 (`/reports`)

**상단 — 기간 선택**
- 프리셋: 이번 주 / 이번 달 / 이번 분기 / 올해
- 사용자 정의 기간 (시작일~종료일)

**차트 영역:**
- 완료율 파이 차트 (완료/미완료/지연 비율)
- 관리항목별 막대 차트 (항목별 완료/미완료 수)
- 월별 완료율 추이 라인 차트
- 담당자별 업무 처리 현황 테이블

**하단 — 엑셀 내보내기 버튼**
- 현재 필터 기준 데이터를 .xlsx로 다운로드

### 9. 설정 (`/settings`) — Admin 전용

**사용자 관리 탭:**
- 사용자 목록 테이블 (이름, 이메일, 역할, 부서, 활성 상태)
- 사용자 추가/수정/비활성화

**알림 설정 탭:**
- 알림 발송 시점 설정 (D-7, D-3, D-1, D-Day 체크박스)
- 알림 채널 설정 (이메일/슬랙/앱푸시)
- 지연 알림 반복 설정 (매일/격일)

---

## 일정 알림 로직

### 자동 알림 발송 규칙

```
매일 오전 9시에 스케줄러 실행:
1. tasks에서 is_checked = false인 업무 조회
2. 각 업무의 due_date와 오늘 날짜 비교:
   - due_date - 오늘 = 7일 → D-7 알림
   - due_date - 오늘 = 3일 → D-3 알림
   - due_date - 오늘 = 1일 → D-1 알림
   - due_date - 오늘 = 0일 → D-Day 알림
   - due_date < 오늘 → 지연 알림 (매일 반복)
3. notifications 테이블에 INSERT
4. 설정된 채널로 발송 (이메일 등)
```

### 반복 업무 자동 생성 규칙

```
업무 완료(is_checked = true) 시:
1. cycle 값 확인
2. cycle이 "수시"가 아닌 경우:
   - 매일: due_date + 1일
   - 매주: due_date + 7일
   - 매월: due_date + 1개월
   - 분기: due_date + 3개월
   - 반기: due_date + 6개월
   - 연간: due_date + 1년
3. 동일한 정보로 새 task INSERT (is_checked = false, 새 due_date)
4. task_history에 "자동 생성" 이력 기록
```

---

## API 엔드포인트 (참고)

### Auth
- `POST /api/auth/login` — 로그인
- `POST /api/auth/logout` — 로그아웃
- `GET /api/auth/me` — 현재 사용자 정보

### Categories
- `GET /api/categories` — 목록 조회
- `POST /api/categories` — 생성 (Admin)
- `PUT /api/categories/:id` — 수정 (Admin)
- `PATCH /api/categories/:id/toggle` — 활성/비활성 토글 (Admin)
- `PUT /api/categories/reorder` — 순서 변경 (Admin)

### Tasks
- `GET /api/tasks` — 목록 조회 (필터/정렬/페이지네이션 쿼리 파라미터)
- `GET /api/tasks/:id` — 상세 조회
- `POST /api/tasks` — 생성
- `PUT /api/tasks/:id` — 수정
- `PATCH /api/tasks/:id/check` — 완료/미완료 토글
- `DELETE /api/tasks/:id` — 삭제
- `POST /api/tasks/:id/duplicate` — 복제
- `PATCH /api/tasks/bulk` — 일괄 처리 (완료/담당자변경/마감일변경)

### Task History
- `GET /api/tasks/:id/history` — 이력 조회

### Task Comments
- `GET /api/tasks/:id/comments` — 댓글 목록
- `POST /api/tasks/:id/comments` — 댓글 작성
- `PUT /api/comments/:id` — 댓글 수정
- `DELETE /api/comments/:id` — 댓글 삭제

### Task Attachments
- `POST /api/tasks/:id/attachments` — 파일 업로드
- `GET /api/attachments/:id/download` — 파일 다운로드
- `DELETE /api/attachments/:id` — 파일 삭제

### Notifications
- `GET /api/notifications` — 알림 목록
- `PATCH /api/notifications/:id/read` — 읽음 처리
- `PATCH /api/notifications/read-all` — 전체 읽음 처리

### Dashboard
- `GET /api/dashboard/summary` — 요약 카드 데이터
- `GET /api/dashboard/progress` — 항목별 진행률
- `GET /api/dashboard/today` — 오늘의 업무
- `GET /api/dashboard/overdue` — 지연 업무
- `GET /api/dashboard/recent-activity` — 최근 활동

### Reports
- `GET /api/reports/completion-rate` — 완료율 (기간별)
- `GET /api/reports/by-category` — 항목별 현황
- `GET /api/reports/trend` — 월별 추이
- `GET /api/reports/by-assignee` — 담당자별 실적
- `GET /api/reports/export` — 엑셀 다운로드

### Users (Admin)
- `GET /api/users` — 목록
- `POST /api/users` — 생성
- `PUT /api/users/:id` — 수정
- `PATCH /api/users/:id/toggle` — 활성/비활성 토글

### Settings (Admin)
- `GET /api/settings/notifications` — 알림 설정 조회
- `PUT /api/settings/notifications` — 알림 설정 변경

---

## 개발 우선순위

### Phase 1 (MVP)
1. 사용자 인증 (로그인/로그아웃)
2. 관리 항목 CRUD + 기본 21개 데이터 시드
3. 업무 등록/수정/삭제
4. 체크리스트 (체크 토글, 필터링, 정렬)
5. 대시보드 (요약 카드, 오늘의 업무, 지연 경고)

### Phase 2
6. 캘린더 뷰
7. 업무 상세 페이지 (이력, 댓글)
8. 일정 알림 (이메일)
9. 반복 업무 자동 생성
10. 첨부파일

### Phase 3
11. 통계/보고서 + 엑셀 내보내기
12. 일괄 처리
13. 사용자 관리 (Admin)
14. 알림 설정
