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
- `adsenseClientId`: AdSense의 `ca-pub-...` 값
- `adsenseSlotId`: 표시할 광고 슬롯 ID
- `brandName`: 사이트 이름
- `ownerName`: 푸터 운영자명
- `supportEmail`: 푸터 이메일

## 광고 영역

현재는 본문 중간 가로형 광고 한 곳이 준비되어 있습니다.
`src/data/landing.js`에 `adsenseClientId`, `adsenseSlotId`를 넣으면 자동으로 출력됩니다.

## 배포

Cloudflare Pages

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
