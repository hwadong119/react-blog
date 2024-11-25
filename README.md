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
