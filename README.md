# 개인 포트폴리오 (portfolio)

개인 정보와 경력, 프로젝트 목록 및 상세 내용, 게시글을 소개하기 위한 **Vite + React + TypeScript** 기반의 개인 포트폴리오 프로젝트입니다.

현재는 프로젝트 개발 환경 구성과 React 기본 애플리케이션 생성까지 완료된 상태입니다.

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [버전 정보 & 런타임 요구사항](#2-버전-정보--런타임-요구사항)
3. [라이브러리 구성](#3-라이브러리-구성)
4. [디렉토리 구성](#4-디렉토리-구성)
5. [앱 아키텍처](#5-앱-아키텍처)
6. [서버 실행 방법](#6-서버-실행-방법)
7. [환경파일 구성](#7-환경파일-구성)
8. [빌드](#8-빌드)
9. [Path Alias](#9-path-alias)
10. [테스트 & 코드 품질](#10-테스트--코드-품질)

---

## 1. 프로젝트 개요

- **목적**: 개인의 경력과 작업 결과물을 한곳에서 소개하는 포트폴리오 웹사이트
- **주요 콘텐츠**
  - 개인 정보 및 경력
  - 프로젝트 목록 및 상세 내용
  - 게시글 및 블로그 콘텐츠
- **현재 구현 상태**: Vite의 React + TypeScript 기본 템플릿 구성

포트폴리오 페이지와 콘텐츠 기능은 추후 개발할 예정이며, 현재 화면은 Vite 기본 시작 화면입니다.

---

## 2. 버전 정보 & 런타임 요구사항

| 항목 | 버전 | 비고 |
|------|------|------|
| **Node.js** | `v24.18.0` | LTS |
| **npm** | `12.0.1` | 패키지 매니저 |
| **React / React DOM** | `19.2.7` | UI 라이브러리 |
| **TypeScript** | `6.0.3` | 타입 시스템 |
| **Vite** | `8.1.4` | 빌드 도구 및 개발 서버 |

### 의존성 설치

```bash
npm install
```

설치된 Node.js와 npm 버전은 다음 명령어로 확인할 수 있습니다.

```bash
node -v
npm -v
```

---

## 3. 라이브러리 구성

### 코어

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `react` / `react-dom` | `19.2.7` | UI 구성 및 렌더링 |
| `typescript` | `6.0.3` | 정적 타입 검사 |
| `vite` | `8.1.4` | 개발 서버 및 프로덕션 빌드 |
| `@vitejs/plugin-react` | `6.0.3` | Vite의 React 지원 및 Fast Refresh |

### 타입

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `@types/node` | `24.13.3` | Node.js 타입 정의 |
| `@types/react` | `19.2.17` | React 타입 정의 |
| `@types/react-dom` | `19.2.3` | React DOM 타입 정의 |

### 코드 품질

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `oxlint` | `1.74.0` | 정적 코드 검사 |

---

## 4. 디렉토리 구성

```text
portfolio/
├── public/                 # 정적 파일
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/             # 이미지 및 SVG 자산
│   ├── App.tsx             # 최상위 React 컴포넌트
│   ├── App.css             # App 컴포넌트 스타일
│   ├── index.css           # 전역 스타일
│   └── main.tsx            # 애플리케이션 진입점
├── index.html              # HTML 진입점
├── package.json            # 의존성 및 npm 스크립트
├── package-lock.json       # 의존성 잠금 파일
├── tsconfig.json           # TypeScript 공통 설정
├── tsconfig.app.json       # 애플리케이션 TypeScript 설정
├── tsconfig.node.json      # Vite 설정용 TypeScript 설정
└── vite.config.ts          # Vite 설정
```

`node_modules/`와 `dist/`는 각각 설치 및 빌드 과정에서 생성되는 디렉토리입니다.

---

## 5. 앱 아키텍처

### 시작점 (`src/main.tsx`)

1. `React.StrictMode`를 적용합니다.
2. `document`의 `#root` 요소에 React 루트를 생성합니다.
3. 최상위 `App` 컴포넌트를 렌더링합니다.

### 최상위 컴포넌트 (`src/App.tsx`)

- 현재 Vite의 기본 React 시작 화면을 렌더링합니다.
- `useState`를 사용하는 카운터 예제가 포함되어 있습니다.
- 포트폴리오 화면과 콘텐츠 구조는 아직 구현되지 않았습니다.

---

## 6. 서버 실행 방법

개발 서버를 실행합니다.

```bash
npm run dev
```

기본 접속 주소는 다음과 같습니다.

```text
http://localhost:5173/
```

코드를 수정하면 Vite의 Hot Module Replacement(HMR)를 통해 화면에 변경 사항이 반영됩니다.

---

## 7. 환경파일 구성

현재 별도의 환경파일이나 환경변수는 사용하지 않습니다.

---

## 8. 빌드

### 프로덕션 빌드

TypeScript 타입 검사 후 프로덕션용 파일을 `dist/`에 생성합니다.

```bash
npm run build
```

### 빌드 결과 미리보기

```bash
npm run preview
```

---

## 9. Path Alias

현재 Path Alias는 설정되어 있지 않으며 상대 경로 import를 사용합니다.

---

## 10. 테스트 & 코드 품질

### Lint

Oxlint를 실행해 코드를 검사합니다.

```bash
npm run lint
```

현재 별도의 테스트 도구와 테스트 코드는 구성되어 있지 않습니다.
