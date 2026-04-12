# Simple Astro Landing

전환 중심으로 간단하게 정리한 Astro 랜딩페이지 템플릿입니다.

## 실행

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 4173
```

브라우저에서 `http://127.0.0.1:4173` 접속

## 가장 먼저 바꿀 곳

`src/data/landing.js`

- `primaryCtaUrl`: 메인 신청 버튼 링크
- `secondaryCtaUrl`: 보조 이동 링크
- `appDownloadUrl`: 앱·어플 다운로드 링크
- `brandName`: 사이트 이름
- `ownerName`: 푸터 운영자명
- `supportEmail`: 푸터 이메일

## 광고 영역

현재는 본문 중간 가로형 광고 한 곳만 남겨두었습니다.

## 배포

Cloudflare Pages

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
