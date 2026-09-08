export const siteConfig = {
  siteUrl: "https://oilguide.infoarounds.com",
  brandName: "오일가이드",
  ownerName: "Your Guide Team",
  supportEmail: "ttugttagi01@gmail.com",
  siteTitle: "오일가이드 | 오늘의 기름값·주유비 계산·에너지 지원",
  siteDescription:
    "전국 휘발유·경유·LPG 가격, 주유비 계산기, 내 주변 주유소, 에너지바우처와 유류비 지원 정보를 한곳에서 확인하세요.",
  ogImagePath: "/oilguide-hero.png",
  locale: "ko_KR",
  publishedAt: "2026-04-13",
  updatedAt: "2026-09-09",
  adsenseClientId: "ca-pub-6067163195544027",
  adsenseSlotId: "3408440776",
};

export const fuelFallback = [
  { code: "B027", name: "휘발유", shortName: "휘발유", price: 1859.2, diff: 0 },
  { code: "D047", name: "자동차용경유", shortName: "경유", price: 1843.56, diff: 0 },
  { code: "K015", name: "자동차용부탄", shortName: "LPG", price: 1098.15, diff: 0 },
];

export const supportPrograms = [
  {
    status: "신청 중",
    title: "에너지바우처",
    summary: "에너지 취약계층의 냉방·난방비를 전기, 도시가스, 지역난방, 등유, LPG, 연탄 구입에 사용할 수 있도록 지원합니다.",
    period: "2026.06.15 - 12.31",
    href: "https://www.energyv.or.kr/info/support_info.do?tab=1",
    source: "에너지바우처 공식 안내",
  },
  {
    status: "신청 중",
    title: "석탄 전환 지원 바우처",
    summary: "연탄쿠폰 지원 가구 중 다른 난방 에너지로 전환한 가구에 57만 6천 원 상당의 바우처를 지원합니다.",
    period: "2026.08.03 - 12.31",
    href: "https://www.energyv.or.kr/info/coal_support_info.do",
    source: "한국에너지공단 공식 안내",
  },
  {
    status: "상시 제도",
    title: "경차 유류세 환급",
    summary: "대상 경차 보유자는 전용 유류구매카드로 주유할 때 유류세 환급 혜택을 받을 수 있습니다. 적용 조건을 먼저 확인하세요.",
    period: "2029년까지 연장",
    href: "https://www.betterfuture.go.kr/front/notificationSpace/pressReleaseDetail.do?articleId=588",
    source: "정부 정책브리핑",
  },
  {
    status: "사업자 지원",
    title: "화물·버스·택시 유가보조금",
    summary: "운송사업자를 위한 유류구매카드와 유가보조금 지급 내역, 부정수급 방지 안내를 공식 포털에서 확인할 수 있습니다.",
    period: "대상별 상이",
    href: "https://www.uga.go.kr/",
    source: "유가보조금관리시스템",
  },
];

export const savingGuides = [
  {
    number: "01",
    title: "싼 주유소가 정말 이득인지 계산하기",
    text: "리터당 가격 차이보다 왕복 이동거리와 내 차의 연비를 함께 계산해야 실제 절약액이 보입니다.",
    href: "/fuel-cost-calculator/",
  },
  {
    number: "02",
    title: "타이어 공기압과 불필요한 짐 점검",
    text: "제조사 권장 공기압을 유지하고 상시 적재물을 줄이는 작은 습관부터 연료 낭비를 낮춰보세요.",
    href: "/#saving-guides",
  },
  {
    number: "03",
    title: "카드 할인은 월 한도까지 비교하기",
    text: "리터당 할인 문구만 보지 말고 전월 실적, 할인 한도, 이용 가능한 주유소를 함께 비교해야 합니다.",
    href: "https://infoarounds.com/%ec%9d%bc%ec%83%81%ec%86%8d-%ed%95%84%ec%9a%94%ec%a0%95%eb%b3%b4/card-app-download/",
  },
];

export const archivedSupportLinks = [
  {
    title: "2026 고유가 피해지원금 안내",
    href: "https://infoarounds.com/2025-%eb%b3%b5%ec%a7%80%ec%a0%95%eb%b3%b4/2026-high-oil-price-support-guide-2/",
  },
  {
    title: "소득 하위 70% 기준 계산",
    href: "https://infoarounds.com/2025-%eb%b3%b5%ec%a7%80%ec%a0%95%eb%b3%b4/bottom-70-income-criteria-calculator/",
  },
  {
    title: "2차 신청 당시 상세 가이드",
    href: "https://infoarounds.com/2025-%eb%b3%b5%ec%a7%80%ec%a0%95%eb%b3%b4/high-oil-price-support-2nd-guide/",
  },
];

export const faqItems = [
  {
    question: "오일가이드의 유가는 어디에서 가져오나요?",
    answer: "전국 평균 유가는 한국석유공사 오피넷의 공식 유가정보 API를 기준으로 제공합니다. 연결이 지연될 때는 마지막 확인 시점과 함께 참고값으로 표시합니다.",
  },
  {
    question: "내 주변 주유소 지도에 가격도 나오나요?",
    answer: "주유소 위치는 공개 지도 데이터를 이용합니다. 판매가격은 오피넷 데이터가 연결된 경우에만 표시하며, 최종 가격과 영업 여부는 방문 전 해당 주유소 또는 오피넷에서 다시 확인하는 것이 안전합니다.",
  },
  {
    question: "주유비 계산 결과는 실제 결제액과 같은가요?",
    answer: "입력한 거리, 연비, 유가를 바탕으로 한 예상 금액입니다. 교통 상황, 공회전, 냉난방 사용, 차량 상태에 따라 실제 금액은 달라질 수 있습니다.",
  },
];
