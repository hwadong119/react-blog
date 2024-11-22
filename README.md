## 프로젝트 세팅

```
yarn create react-app react-blog --template typescript
```

## 패키지 설치

```
 npm install react-router-dom
 npm install --dev @types/react-router-dom
```

## 디폴트 패스 주는 법

이상한 경로로 들어오면 루트 경로로

```typescript
<Route path="*" element={<Navigate replace to="/" />} />
```
