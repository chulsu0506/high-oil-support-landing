# 오일가이드

oilguide.infoarounds.com에서 운영하는 기름값·에너지비 절약 포털입니다.

## 주요 기능

- 오피넷 전국 평균 휘발유·경유·LPG 가격
- 거리·실연비·유가 기반 월간 및 연간 주유비 계산
- OpenStreetMap 기반 반경 5km 주변 주유소 지도
- 에너지바우처, 경차 유류세 환급, 운송사업자 유가보조금 안내
- 종료된 고유가 피해지원금 자료 분리 보존

## 로컬 실행

    npm clean-install
    npm run dev

브라우저에서 http://127.0.0.1:4321 을 엽니다.

## 오피넷 API 연결

1. [오피넷 유가정보 API](https://www.opinet.co.kr/user/custapi/custApiInfo.do)에서 인증키를 발급받습니다.
2. 로컬에서는 .dev.vars.example 을 참고해 .dev.vars 파일에 OPINET_API_KEY 를 설정합니다.
3. Cloudflare에서는 아래 명령으로 키를 암호화된 Secret으로 등록합니다.

    npx wrangler secret put OPINET_API_KEY

인증키가 없거나 오피넷 응답이 지연되면 2026년 9월 9일에 마지막으로 확인한 참고값을 날짜와 함께 표시합니다. 키를 프런트엔드 코드나 GitHub 저장소에 직접 넣지 마세요.

## 배포

    npm run build
    npx wrangler deploy

GitHub 연동 배포는 Build command npm run build, Deploy command npx wrangler deploy 를 사용합니다.
