# MRO 통합 관리 시스템

MRO(Maintenance, Repair, Operations) 업무를 통합 관리하는 웹 애플리케이션 프로토타입입니다.

## 프로젝트 개요

PPT 발표자료용 화면 프로토타입으로, 백엔드 API 없이 프론트엔드 화면만 구현되어 있습니다. 목 데이터(Mock Data)를 사용하여 실제와 유사한 UI/UX를 제공합니다.

## 기술 스택

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS (앰버 톤 커스텀 색상)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Date Library**: date-fns
- **Icons**: lucide-react

## 주요 기능

### 구현된 화면
1. **로그인 페이지** - 간단한 이메일 입력으로 로그인
2. **대시보드** - 요약 카드, 관리항목별 진행률, 오늘의 업무, 지연 경고, 최근 활동
3. **체크리스트** - 업무 목록, 필터링, 검색, 페이지네이션
4. **업무 등록 모달** - 새 업무 추가 폼

### 데이터
- **관리 항목**: 21개 (자산, 문서, IT, 차량, 비품/사무용품 등)
- **사용자**: 4명 (관리자, 담당자, 조회자)
- **업무**: 23개 (다양한 상태: 완료, 미완료, 지연, 오늘 마감 등)

## 설치 및 실행

### 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드
```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 프리뷰
```bash
npm run preview
```

## 로그인 정보

아무 이메일이나 입력하면 로그인할 수 있습니다. 테스트용 계정:
- admin@example.com (관리자)
- staff1@example.com (담당자)
- staff2@example.com (담당자)
- viewer@example.com (조회자)

비밀번호는 검증하지 않으므로 아무 값이나 입력하면 됩니다.

## GitHub Pages 배포

### 방법 1: GitHub Actions 사용 (권장)

1. GitHub 저장소 생성
2. 저장소 Settings > Pages > Source를 "GitHub Actions"로 설정
3. `.github/workflows/deploy.yml` 파일이 자동으로 배포 진행
4. `https://<username>.github.io/mro/` 에서 확인

### 방법 2: 수동 배포

```bash
npm run build
# dist 폴더를 gh-pages 브랜치로 푸시
```

## 화면 캡처 가이드

PPT용 화면 캡처 시 권장 사항:

### 해상도
- **1920x1080** (Full HD) 권장
- 브라우저 줌: 100%

### 캡처할 화면
1. **로그인 페이지** - `/login` (전체 화면)
2. **대시보드** - `/dashboard` (스크롤 없이 보이는 영역)
3. **체크리스트** - `/checklist` (전체 테이블)
4. **업무 등록 모달** - 체크리스트에서 "+ 새 업무" 클릭

### 캡처 도구
- Windows: Snipping Tool, Snip & Sketch
- 브라우저: 개발자 도구 > 스크린샷 기능
- 전문 도구: ShareX, Lightshot

## 프로젝트 구조

```
mro/
├── src/
│   ├── components/       # 재사용 컴포넌트
│   │   ├── common/      # Button, Card, Badge 등
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── TaskModal.tsx
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── Checklist.tsx
│   ├── data/            # 목 데이터
│   │   └── mockData.ts
│   ├── types/           # TypeScript 타입
│   │   └── index.ts
│   ├── utils/           # 유틸리티
│   │   └── date.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 색상 팔레트 (앰버 톤)

- **Primary**: `#E8720C` (메인 오렌지)
- **Primary Dark**: `#1A1A2E` (사이드바 남색)
- **Accent**: `#F59E0B` (강조)
- **Success**: `#10B981` (완료)
- **Danger**: `#EF4444` (지연/경고)
- **Background**: `#FFF7ED` (살짝 오렌지빛)

## 라이선스

MIT License
