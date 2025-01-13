## 프로젝트 세팅

```
npm create vite@latest react-blog
```

## 패키지 설치

```
 npm install react-router-dom
 npm install --dev @types/react-router-dom
```

## 디폴트 패스 주는 법

이상한 경로로 들어오면 루트 경로로

```javascript
<Route path="*" element={<Navigate replace to="/" />} />
```

## 절대 경로 설정

```javascript
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
    },
  },
});
```

## Firebase - onAuthStateChanged 개념

- Firebase Au thentication 서비스에서 제공하는 메서드
- 인증 상태가 변경될 때마다 호출되는 리스너 설정 (로그인, 로그아웃)
- 사용자 객체를 인자로 받는 콜백 함수 등록
  - 사용자의 로그인 상태 확인 후 적절한 작업 수행
  - 로그인 상태일 때는 사용자의 정보를, 아니라면 null을 리턴함
