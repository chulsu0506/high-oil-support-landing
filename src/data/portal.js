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
  kakaoJavaScriptKey: "2590efd5d8faf6f739dc287417e44d4b",
};

export const fuelFallback = [
  { code: "B027", name: "휘발유", shortName: "휘발유", price: 1859.2, diff: 0 },
  { code: "D047", name: "자동차용경유", shortName: "경유", price: 1843.56, diff: 0 },
  { code: "K015", name: "자동차용부탄", shortName: "LPG", price: 1098.15, diff: 0 },
];

export const supportPrograms = [
  {
    slug: "energy-voucher",
    status: "신청 중",
    title: "에너지바우처",
    summary: "에너지 취약계층의 냉방·난방비를 전기, 도시가스, 지역난방, 등유, LPG, 연탄 구입에 사용할 수 있도록 지원합니다.",
    period: "2026.06.15 - 12.31",
    href: "/benefits/energy-voucher/",
    officialHref: "https://www.energyv.or.kr/info/support_info.do?tab=1",
    source: "에너지바우처 공식 안내",
  },
  {
    slug: "coal-transition-voucher",
    status: "신청 중",
    title: "연탄전환 에너지바우처",
    summary: "연탄쿠폰 지원 가구 중 다른 난방 에너지로 전환한 가구에 57만 6천 원 상당의 바우처를 지원합니다.",
    period: "2026.08.03 - 12.31",
    href: "/benefits/coal-transition-voucher/",
    officialHref: "https://www.energyv.or.kr/info/coal_support_info.do",
    source: "한국에너지공단 공식 안내",
  },
  {
    slug: "light-car-fuel-tax-refund",
    status: "상시 제도",
    title: "경차 유류세 환급",
    summary: "대상 경차 보유자는 전용 유류구매카드로 주유할 때 유류세 환급 혜택을 받을 수 있습니다. 적용 조건을 먼저 확인하세요.",
    period: "현행법상 2026.12.31까지",
    href: "/benefits/light-car-fuel-tax-refund/",
    officialHref: "https://law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1032235673",
    source: "국가법령정보센터",
  },
  {
    slug: "transport-fuel-subsidy",
    status: "사업자 지원",
    title: "화물·버스·택시 유가보조금",
    summary: "운송사업자를 위한 유류구매카드와 유가보조금 지급 내역, 부정수급 방지 안내를 공식 포털에서 확인할 수 있습니다.",
    period: "대상별 상이",
    href: "/benefits/transport-fuel-subsidy/",
    officialHref: "https://www.uga.go.kr/",
    source: "유가보조금관리시스템",
  },
];

export const savingGuides = [
  {
    number: "01",
    title: "싼 주유소가 정말 이득인지 계산하기",
    text: "리터당 가격 차이보다 왕복 이동거리와 내 차의 연비를 함께 계산해야 실제 절약액이 보입니다.",
    href: "/guides/cheap-station-real-savings/",
  },
  {
    number: "02",
    title: "타이어 공기압과 불필요한 짐 점검",
    text: "제조사 권장 공기압을 유지하고 상시 적재물을 줄이는 작은 습관부터 연료 낭비를 낮춰보세요.",
    href: "/guides/tire-pressure-fuel-economy/",
  },
  {
    number: "03",
    title: "카드 할인은 월 한도까지 비교하기",
    text: "리터당 할인 문구만 보지 말고 전월 실적, 할인 한도, 이용 가능한 주유소를 함께 비교해야 합니다.",
    href: "/guides/fuel-card-discount/",
  },
];

export const supportArticles = [
  {
    ...supportPrograms[0],
    description: "2026 에너지바우처 대상, 세대원 수별 지원금액, 신청기간과 신청방법을 한 번에 확인하세요.",
    highlights: [
      ["신청 기간", "2026.06.15 - 12.31"],
      ["사용 기간", "2026.07.01 - 2027.05.31"],
      ["지원 금액", "세대당 29만 5,200원부터"],
    ],
    sections: [
      {
        title: "누가 신청할 수 있나요?",
        paragraphs: ["생계·의료·주거·교육급여 수급자이면서 주민등록표상 수급자 본인 또는 세대원이 아래 특성 중 하나에 해당해야 합니다."],
        bullets: ["노인, 영유아, 등록 장애인 또는 임산부", "중증·희귀·중증난치질환자", "한부모가족, 소년소녀가정 또는 다자녀세대"],
      },
      {
        title: "2026년 세대원 수별 지원금액",
        paragraphs: ["아래 금액은 월별 금액이 아니라 2026년도 총 지원액입니다."],
        table: {
          headers: ["1인", "2인", "3인", "4인 이상"],
          rows: [["295,200원", "407,500원", "532,700원", "701,300원"]],
        },
      },
      {
        title: "신청 전에 준비할 것",
        paragraphs: ["주민등록상 거주지 행정복지센터에서 방문 신청하거나 복지로에서 온라인으로 신청할 수 있습니다."],
        bullets: ["본인 신청: 신분증과 에너지이용권 발급 신청서", "대리 신청: 위임장과 대리인 신분증", "요금차감 선택: 최근 전기·도시가스·지역난방 요금고지서"],
      },
    ],
  },
  {
    ...supportPrograms[1],
    description: "2026 연탄전환 에너지바우처 대상과 57만 6천 원 지원 조건, 신청 및 사용기간을 정리했습니다.",
    highlights: [["신청 기간", "2026.08.03 - 12.31"], ["지원 금액", "세대당 576,000원"], ["사용 기간", "2026.10.03 - 2027.05.31"]],
    sections: [
      {
        title: "연탄을 쓴다고 모두 대상은 아닙니다",
        paragraphs: ["2026년 1월 이후 연탄보일러를 비연탄보일러로 교체한 세대 중 정해진 취약계층 기준을 충족해야 합니다."],
        bullets: ["기초생활수급자 또는 차상위계층", "노인, 등록 장애인 또는 한부모가족", "소년소녀가정과 가정위탁보호 아동 포함 세대"],
      },
      {
        title: "어디에 사용할 수 있나요?",
        paragraphs: ["국민행복카드 실물카드로 지급되며 전기, 도시가스, 등유, LPG 비용을 결제할 수 있습니다. 연탄쿠폰이나 동절기 에너지바우처 등과 중복이 제한될 수 있습니다."],
      },
      {
        title: "신청 방법",
        paragraphs: ["주소지 읍·면·동 행정복지센터에서 신청합니다. 비연탄보일러 교체 이력과 지원 자격을 확인하므로 관련 증빙을 미리 문의하는 편이 좋습니다."],
      },
    ],
  },
  {
    ...supportPrograms[2],
    description: "경차 유류세 환급 대상 차량과 전용 유류구매카드 사용법, 현행 적용기한을 정확하게 확인하세요.",
    highlights: [["차량 기준", "배기량 1,000cc 미만 등"], ["환급 방식", "전용 유류구매카드 결제"], ["현행 적용", "2026.12.31까지"]],
    sections: [
      {
        title: "핵심은 차량과 가구 보유 조건입니다",
        paragraphs: ["배기량 1,000cc 미만 등 법령상 경형자동차 기준을 충족하고, 가구의 자동차 보유 구성 요건도 맞아야 합니다. 같은 가구의 다른 차량 종류에 따라 대상 여부가 달라질 수 있어 카드사 신청 단계에서 조회하는 것이 정확합니다."],
      },
      {
        title: "주유할 때 자동으로 환급됩니다",
        paragraphs: ["지정 카드사의 환급용 유류구매카드를 발급받아 해당 경차의 연료를 결제하면 카드사가 환급액을 반영합니다. 휘발유와 경유는 법령상 리터당 250원 환급 규정이 적용됩니다."],
        bullets: ["한 사람은 하나의 카드사에서만 환급용 카드를 발급", "대상 차량 외 사용이나 카드 양도는 환급액과 가산세가 부과될 수 있음", "연간 한도와 발급 가능 여부는 카드사에서 최종 확인"],
      },
      {
        title: "2029년 연장 표시는 아직 구분해서 봐야 합니다",
        paragraphs: ["2026 세제개편안에는 2029년 말까지 연장하는 내용이 발표됐지만, 현재 확인되는 시행 법령의 적용기한은 2026년 12월 31일입니다. 법 개정 완료 여부를 확인한 뒤 기간을 갱신하겠습니다."],
      },
    ],
  },
  {
    ...supportPrograms[3],
    description: "화물차·버스·택시 운송사업자의 유가보조금 대상, 유류구매카드, 지급내역 확인 순서를 안내합니다.",
    highlights: [["지원 대상", "화물·버스·택시 운송사업자"], ["이용 수단", "유류구매카드"], ["지급 단가", "공식 포털에서 실시간 확인"]],
    sections: [
      {
        title: "일반 승용차 지원과 다른 사업자 제도입니다",
        paragraphs: ["운송사업 허가와 차량 등록 등 제도별 자격을 충족한 화물차, 버스, 택시 사업자가 대상입니다. 개인 승용차의 주유비를 보전하는 제도는 아닙니다."],
      },
      {
        title: "먼저 확인할 세 가지",
        bullets: ["차량과 운송사업 자격이 시스템에 정상 등록됐는지", "업종에 맞는 유류구매카드가 발급됐는지", "최근 지급지침 변경과 부정수급 제한 사항이 있는지"],
      },
      {
        title: "지급단가는 고정해 적지 않습니다",
        paragraphs: ["연료별 지급단가와 지침은 변경될 수 있습니다. 오일가이드에서는 확인 순서를 설명하고, 실제 단가와 지급내역은 국토교통부 유가보조금 포털의 최신 값을 기준으로 안내합니다."],
      },
    ],
  },
];

export const guideArticles = [
  {
    slug: "cheap-station-real-savings",
    number: "01",
    title: "싼 주유소가 정말 이득인지 계산하는 법",
    description: "주유소 가격 차이와 왕복 이동거리, 차량 연비를 함께 계산해 실제 절약액을 판단하는 방법입니다.",
    intro: "표시 가격이 가장 낮은 곳이 항상 가장 경제적인 곳은 아닙니다. 추가 이동에 쓰는 연료비를 먼저 빼야 실제 절약액이 보입니다.",
    sections: [
      { title: "가격 차이로 아끼는 금액", paragraphs: ["주유 예정량에 리터당 가격 차이를 곱합니다. 40L를 넣고 가까운 곳보다 리터당 40원이 저렴하면 표시상 절약액은 1,600원입니다."] },
      { title: "추가 이동비를 반드시 빼세요", paragraphs: ["싼 주유소까지 왕복 8km를 더 가고 실연비가 10km/L, 유가가 1,850원이라면 추가 연료비는 약 1,480원입니다. 이 경우 실제 절약은 약 120원에 불과합니다."], bullets: ["실제 절약액 = 주유량 × 가격 차이 - 추가 이동거리 ÷ 실연비 × 현재 유가", "시간과 통행료가 든다면 그 비용도 함께 고려", "평소 이동 경로 안에 있는 저렴한 주유소가 가장 유리한 경우가 많음"] },
      { title: "내 조건으로 바로 비교하기", paragraphs: ["오일가이드 계산기에 평소 이동거리와 실연비를 넣어 월간 주유비를 먼저 확인해 보세요."], cta: { label: "주유비 계산기 열기", href: "/fuel-cost-calculator/" } },
    ],
  },
  {
    slug: "tire-pressure-fuel-economy",
    number: "02",
    title: "타이어 공기압과 차량 무게로 연료 낭비 줄이기",
    description: "권장 공기압 확인, 냉간 점검, 불필요한 적재물 정리로 연비 손실을 줄이는 실전 점검법입니다.",
    intro: "연비를 높이기 위해 특별한 장비부터 살 필요는 없습니다. 타이어와 적재물처럼 매일 영향을 주는 요소부터 점검하는 것이 먼저입니다.",
    sections: [
      { title: "권장 공기압은 차량에서 확인합니다", paragraphs: ["운전석 문 안쪽 또는 사용설명서에 표시된 제조사 권장값을 기준으로 하세요. 타이어 옆면의 최대 공기압은 일상 주행 권장값이 아닙니다."], bullets: ["주행 전 타이어가 식은 상태에서 측정", "장거리·고속 주행 전 네 바퀴를 함께 확인", "계절이 바뀌거나 기온이 크게 내려갈 때 재점검"] },
      { title: "상시 적재물을 한 번 비워보세요", paragraphs: ["트렁크에 오래 두는 무거운 공구, 캠핑 장비, 물품은 가속할 때마다 추가 에너지를 요구합니다. 꼭 필요한 안전용품은 남기되 사용하지 않는 짐은 정리하세요."] },
      { title: "정비보다 먼저 기록해 볼 숫자", paragraphs: ["주유할 때마다 주행거리와 주유량을 기록하면 차량의 실제 연비 변화를 확인할 수 있습니다. 갑작스러운 연비 저하는 공기압, 운전 환경, 정비 상태를 점검할 신호가 될 수 있습니다."] },
    ],
  },
  {
    slug: "fuel-card-discount",
    number: "03",
    title: "주유 할인카드는 리터당 금액보다 월 한도를 보세요",
    description: "주유 할인카드의 전월 실적, 할인 한도, 대상 주유소를 비교해 실제 월 혜택을 계산하는 방법입니다.",
    intro: "큰 할인 숫자보다 중요한 것은 내가 매달 실제로 받을 수 있는 금액입니다. 전월 실적과 월 한도에서 빠지는 조건까지 함께 봐야 합니다.",
    sections: [
      { title: "세 숫자만 먼저 적어보세요", bullets: ["전월 실적: 혜택을 받기 위해 써야 하는 금액", "월 할인 한도: 한 달에 돌려받을 수 있는 최대 금액", "대상 주유소: 모든 브랜드인지 특정 정유사만 해당하는지"] },
      { title: "리터당 할인 문구를 월 혜택으로 바꾸기", paragraphs: ["월 100L를 주유하고 리터당 80원 할인이 모두 적용되면 계산상 8,000원입니다. 하지만 월 한도가 5,000원이면 실제 최대 혜택은 5,000원입니다. 실적을 채우기 위한 불필요한 소비가 있다면 절약 효과는 더 줄어듭니다."] },
      { title: "신청 전 확인할 제외 조건", bullets: ["무이자 할부, 세금, 상품권 등이 전월 실적에서 제외되는지", "LPG 충전소와 간편결제가 할인 대상인지", "할인이 청구할인·포인트·현장할인 중 어떤 방식인지"], cta: { label: "카드·앱 안내 글 보기", href: "https://infoarounds.com/%ec%9d%bc%ec%83%81%ec%86%8d-%ed%95%84%ec%9a%94%ec%a0%95%eb%b3%b4/card-app-download/", external: true } },
    ],
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
    answer: "지도와 길찾기는 카카오맵을 사용하고 판매가격은 한국석유공사 오피넷 데이터를 표시합니다. 최종 가격과 영업 여부는 방문 전 해당 주유소 또는 오피넷에서 다시 확인하는 것이 안전합니다.",
  },
  {
    question: "주유비 계산 결과는 실제 결제액과 같은가요?",
    answer: "입력한 거리, 연비, 유가를 바탕으로 한 예상 금액입니다. 교통 상황, 공회전, 냉난방 사용, 차량 상태에 따라 실제 금액은 달라질 수 있습니다.",
  },
];
