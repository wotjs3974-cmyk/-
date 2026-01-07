
import { PortfolioItem, PhilosophyData, ResumeData } from '../types';

const WORKS_KEY = 'portfolio_works_v4';
const PHILOSOPHY_KEY = 'portfolio_philosophy_v3';
const RESUME_KEY = 'portfolio_resume_v2';

const initialWorks: PortfolioItem[] = [
  {
    id: 'overwatch-dragon-001',
    projectLabel: 'Cinematic',
    title: 'OverWatch Dragon',
    subtitle: 'Cinematic design',
    videoUrl: 'h_BykHHebsU',
    thumbnailUrl: 'https://img.youtube.com/vi/h_BykHHebsU/maxresdefault.jpg',
    intent: '캐릭터 간 서사와 감정의 흐름을 중심으로,\n사운드가 장면의 긴장을 이끌도록 설계했습니다.',
    details: [
      { 
        label: '포트폴리오의 전반적인 의도', 
        value: '시네마틱 특유의 현실적이면서도 과장된 연출을 사운드로 강화하기 위해,\n캐릭터 간의 서사와 감정 흐름에 집중하여 사운드를 설계했습니다.\n화려함보다 장면의 긴장과 몰입을 극대화하는 방향으로 접근했습니다.' 
      },
      { 
        label: '사운드 디자인 핵심 포인트', 
        value: '1:28~1:31\n\n기존 영상에서 한조가 기를 모으는 장면이 시각적 대비에 비해 사운드적 특색이 부족하다고 판단했습니다.\n이에 Quick Time Event(QTE) 감각의 사운드를 적용하여 에너지가 축적되는 과정과 플레이어의 집중을 유도하는 연출을 참고했습니다.\n추가로 점진적인 리듬과 텐션을 통해 다음 행동으로 이어지는 기대감을 강조했습니다.\n\n1:49~1:53\n\n전기 속성을 지닌 용 내부에 들어간 상황을 표현하기 위해 전기 사운드와 폭풍 계열 사운드를 레이어링했습니다.\n단순한 전기 효과음이 아닌, 전기 마법의 영역 안으로 진입한 듯한 공간감과 압도감을 전달하는 데 초점을 맞췄습니다.' 
      },
      { 
        label: '포트폴리오를 통해 전달하고 싶은 점', 
        value: '이 포트폴리오는 사운드를 단순히 장면에 덧붙이는 요소가 아니라, 서사와 연출을 강화하는 핵심 장치로 활용하는 접근 방식을 보여주기 위해 구성되었습니다.\n\n각 장면에서 “소리가 무엇을 더 이야기해줄 수 있는가”를 기준으로 판단하며, 시각적 정보가 이미 전달하는 요소를 반복하기보다는 사운드를 통해 감정의 흐름과 긴장감을 확장하고자 했습니다.' 
      }
    ]
  },
  {
    id: 'undecember-creature-001',
    projectLabel: 'creature',
    title: 'Undecember Creature',
    subtitle: 'creature design',
    videoUrl: 'ZIXP0DsqwFw',
    thumbnailUrl: 'https://img.youtube.com/vi/ZIXP0DsqwFw/maxresdefault.jpg',
    intent: '무겁고 어두운 질감을 중심으로,\n크리쳐의 존재감이 드러나도록 설계했습니다.',
    details: [
      {
        label: '포트폴리오의 전반적인 의도',
        value: '몬스터와 캐릭터 사운드의 명확한 차별화를 목표로, 무겁고 어두운 톤의 사운드를 중심으로 크리쳐의 질감과 존재감을 표현했습니다.\n단순한 효과음이 아닌, 크리쳐가 가진 위험성·이질감·불쾌한 생명감이 자연스럽게 전달되도록 설계했습니다.'
      },
      {
        label: '캐릭터별 사운드 디자인 의도',
        value: '0:28 ~ 0:30\n\nAcid 계열 사운드를 레이어링하여\n크리쳐의 공격이 지닌 산성 특유의 부식감과 위협적인 성질을 강조했습니다.\n날카로운 질감보다는 점액적이고 끈적한 인상을 주어 생물적인 불쾌함이 느껴지도록 구성했습니다.\n\n0:53 ~ 0:55\n\n영적인 속성을 가진 몬스터의 대사를 표현하기 위해 과감한 리버브와 딜레이를 사용했습니다.\n직접적인 발화가 아닌, 현실과 분리된 존재가 공간 전체에 울리는 듯한 인상을 주어 실체가 모호한 크리쳐의 특성을 사운드로 드러내고자 했습니다.'
      },
      {
        label: '포트폴리오를 통해 전달하고 싶은 점',
        value: '이 포트폴리오는 단순히 개별 사운드의 완성도를 보여주는 것이 아니라, 크리쳐라는 존재가 게임 세계 안에서 어떤 감정과 긴장감을 만들어내는지를 사운드 디자인으로 설계하는 과정에 초점을 두었습니다.\n\n각 사운드는 단독으로 튀기보다는 다른 캐릭터, 배경 사운드, 플레이 상황과의 관계 속에서 크리쳐의 역할과 존재감이 자연스럽게 드러나도록 구성했습니다.'
      }
    ]
  },
  {
    id: 'blue-archive-ui-001',
    projectLabel: 'UI',
    title: 'Blue Archive UI',
    subtitle: 'UI design',
    videoUrl: 'y1QHizq200E',
    thumbnailUrl: 'https://img.youtube.com/vi/y1QHizq200E/maxresdefault.jpg',
    intent: 'UI 연출 안에서도 세계관이 느껴지도록,\n사운드의 톤과 역할을 설계했습니다.',
    details: [
      {
        label: '포트폴리오의 전반적인 의도',
        value: '청량함과 카툰 스타일의 톤을 중심으로 구성하되, 플레이어의 몰입을 과도하게 방해하지 않으면서도 필요한 정보를 명확하게 전달하는 데 초점을 두었습니다.\n\n획득, 레벨업 등 플레이어에게 긍정적인 피드백이 필요한 상황에서는 쉬머(shimmer) 계열 사운드를 적극적으로 활용하여 보상의 감각을 강화하고, 시각적 연출과 감정적인 만족감을 동시에 보조하고자 했습니다.'
      },
      {
        label: '사운드 디자인 핵심 포인트',
        value: '0:04~0:10\n\nUI 버튼 클릭 사운드에서는 청량한 인상을 전달하기 위해 버블 계열 사운드와 카툰 스타일의 사운드를 적절히 조합하였고 반복 사용 시에도 부담 없이 사용할 수 있는 UI 사운드를 목표로 했습니다.\n\n0:36~0:37\n\n카툰스러운 연출을 강조하기 위해 애니메이션 카툰에서 자주 사용되는 과장된 타이밍과 질감의 사운드를 적극적으로 차용해 가챠 화면의 단순한 상호작용도 경쾌하고 생동감 있게 느껴지도록 의도했습니다.\n\n0:59~1:02\n\n폐허를 배경으로 한 캐릭터의 분위기를 사운드로 표현하기 위해, 캐릭터 가챠 연출에 whisper 사운드를 적용했습니다.\n미묘하게 깔린 공식 질감이 캐릭터의 세계관과 정서를 암시하도록 설계하여, UI 연출임에도 캐릭터 정보 전달의 역할을 수행하도록 했습니다.'
      },
      {
        label: '포트폴리오를 통해 전달하고 싶은 점',
        value: '본 포트폴리오를 통해 UI 사운드가 단순한 효과음이 아닌, 플레이 흐름과 감정을 자연스럽게 보조하는 요소가 되어야 한다는 관점을 전달하고자 했습니다.\n\n각 사운드는 개별적인 존재감보다 전체 톤과의 조화를 우선으로 설계했으며, 플레이어가 무의식적으로 정보를 인지할 수 있도록 기능성과 감성의 균형에 집중했습니다.'
      }
    ]
  },
  {
    id: 'zzz-skill-reel-001',
    projectLabel: 'Skill',
    title: 'Zenless Zone Zero SKILL Reel',
    subtitle: 'Skill design',
    videoUrl: 'na3KGAlSyvE',
    thumbnailUrl: 'https://img.youtube.com/vi/na3KGAlSyvE/maxresdefault.jpg',
    intent: '물리적 리얼리티보다 캐릭터성을 중심으로,\n사운드의 톤과 질감을 설계했습니다.',
    details: [
      {
        label: '포트폴리오의 전반적인 의도',
        value: '디자인 전반적으로 카툰스러운 느낌을 내기 위해 애니메이션 Shing이나 사운드를 적극 차용했으며 마법 스킬 사운드의 경우 시각적 이펙트와의 일체감을 높이기 위해 쉬머(shimmer) 계열 사운드를 중심으로 디자인을 진행했습니다.\n\n또한 전체 사운드가 과도하게 산만해지지 않도록 SSL 계열 컴프레서를 사용해 다이내믹을 정제하고, 톤을 통일하여 깔끔하고 안정적인 사운드 인상을 유지하는 데 초점을 두었습니다.'
      },
      {
        label: '캐릭터별 사운드 디자인 의도',
        value: '버니스 캐릭터 의도 (0:02~0:03)\n\n캐릭터의 엉뚱하고 튀는 성격을 명확하게 전달하기 위해 해당 구간에서는 사실적인 움직임 소리 대신, 의도적으로 카툰 풍의 스프링 사운드를 사용했습니다.\n이를 통해 물리적 리얼리티보다 캐릭터의 성격과 연출 톤을 우선시하며, 짧은 순간에도 캐릭터의 개성을 직관적으로 인지할 수 있도록 설계했습니다.\n\n이블린 캐릭터 의도 (0:49~0:51)\n\n채찍 공격 후 남는 잔향이 시각적으로 얇은 실처럼 느껴진다고 판단하여, 이를 사운드로 표현하고자 유리 질감의 쉬머 사운드를 적극적으로 활용했습니다.\n날카롭고 가벼운 고역대 잔향을 통해 공격의 궤적과 여운을 강조하고, 캐릭터의 공격 스타일을 청각적으로 보조하는 데 목적을 두었습니다.\n\n미야비 캐릭터 의도 (0:27~0:30)\n\n본 게임에서는 요도 표현에 쉬머와 벨 사운드를 사용하는 방식이 캐릭터성을 충분히 부여하지 못한다고 판단했습니다.\n이에 단순한 마법적 반짝임보다는 보다 영적인 이미지를 전달하기 위해, 신사를 연상시키는 벨 사운드와 고스트 계열 사운드를 조합하여 요도의 성격을 재해석했습니다.\n이를 통해 캐릭터의 분위기와 세계관에 어울리는 방향으로 사운드의 정체성을 강화하고자 했습니다.'
      },
      {
        label: '포트폴리오를 통해 전달하고 싶은 점',
        value: '각 캐릭터의 사운드는 단순한 스킬 효과음이 아니라, 성격과 연출 의도를 전달하는 하나의 표현 수단으로 기능하도록 설계했으며, 시각적 연출과의 관계성을 지속적으로 고려하며 디자인했습니다.'
      }
    ]
  }
];

const initialPhilosophy: PhilosophyData = {
  heroTitle: "플레이의 *몰입*을 소리를 통해 *확장*하고자 합니다.",
  heroSubtitle: "사운드는 눈에 띄지 않지만, 찰나의 순간을 분명한 인상으로 남깁니다.\n저는 그 짧은 감각이 기억으로 이어지는 방향을 지향합니다.\n\n사운드는 크기보다 맥락이 중요하다고 생각합니다.\n언제, 어떻게 들리는지가 플레이의 인상을 바꾼다고 믿습니다."
};

const initialResume: ResumeData = {
  name: "김재선",
  birthDate: "1997.10.13",
  email: "wotjs3974@naver.com",
  phone: "010. 3299. 7522",
  location: "gyeonggi-do, Korea",
  address: "서울특별시 덕양구 화중로",
  instagram: "https://www.instagram.com/jaesaeon7522/",
  moreWorksUrl: "https://www.youtube.com/@%EA%B9%80%EC%9E%AC%EC%84%A0-r1t",
  summary: "사용자의 경험을 심화시키는 반응형 사운드 시스템 설계와 디테일한 사운드 디자인에 집중하는 게임 사운드 디자이너입니다.",
  techStack: [
    { 
      name: "Cubase / Ableton", 
      description: "사운드 디자인 및 음악 제작을 위한 DAW 활용 능력\nMIDI 시퀀싱, 오디오 편집, 이펙트 체인 구성 및 믹싱 작업 숙련\n게임 및 미디어용 효과음 제작, 루프·변주 사운드 리소스 제작 경험" 
    },
    { 
      name: "Wwise / FMOD", 
      description: "게임 오디오 미들웨어 기초 이해\n이벤트, 스위치, 파라미터(RTPC) 개념 이해 및 기본 설정 경험\nUnity / Unreal Engine 연동을 통한 간단한 사운드 구현 및 테스트" 
    },
    { 
      name: "Unity / Unreal", 
      description: "게임 엔진 환경에서 오디오 시스템 구조 기초 이해\n미들웨어 연동 및 사운드 트리거 설정 경험\n플레이 상황에 따른 사운드 적용 흐름 이해" 
    },
    { 
      name: "Excel", 
      description: "데이터 정리, 필터·정렬, 기본 함수 활용 가능\n표 작성 및 문서 정리 업무 수행 가능" 
    }
  ],
  experience: [
    { 
      title: "TEAM Rection", 
      period: "22. 11 - 25. 08", 
      description: "팀 단위 작곡 프로젝트에 참여하여 곡 초안 제작 및 마무리 작업 수행\n\n멜로디·코드 진행 아이디어 제안 및 편곡 보조\n\n데모 트랙 수정, 구조 정리, 사운드 디테일 보완 작업 경험" 
    },
    { 
      title: "2026 아이돌 데뷔 앨범 참여", 
      period: "23. 05 - 23. 08", 
      description: "2026년 데뷔 예정 아이돌 앨범 제작 과정에 작곡가로 참여\n\n곡 구성 단계부터 데모 제작 및 수정 작업 진행" 
    },
    { 
      title: "엠나인 아카데미 수료", 
      period: "25. 06 - 25. 12", 
      description: "게임 사운드 디자인 이론 및 효과음 제작 실습\n\nWwise / FMOD 기초 활용 및 인터랙티브 사운드 구조 이해\n\nUnity / Unreal Engine 연동을 통한 게임 오디오 구현 실습" 
    },
    { 
      title: "NH&C", 
      period: "24. 09 - 25. 02", 
      description: "기업 및 브랜드 홍보를 위한 마케팅 자료 제작 참여\n\n인스타그램, 블로그 콘텐츠 기획 및 제작\n\n상세페이지 구성 및 문구 작성 보조" 
    }
  ],
  education: [
    {
      school: "Joongbu University",
      major: "Department of Business Administration",
      status: "Graduated"
    },
    {
      school: "Seongsa High School",
      major: "",
      status: "Graduated"
    }
  ]
};

export const getWorks = (): PortfolioItem[] => {
  const stored = localStorage.getItem(WORKS_KEY);
  if (!stored) return initialWorks;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialWorks;
  }
};

export const saveWorks = (items: PortfolioItem[]) => {
  localStorage.setItem(WORKS_KEY, JSON.stringify(items));
};

export const getPhilosophy = (): PhilosophyData => {
  const stored = localStorage.getItem(PHILOSOPHY_KEY);
  if (!stored) return initialPhilosophy;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialPhilosophy;
  }
};

export const savePhilosophy = (data: PhilosophyData) => {
  localStorage.setItem(PHILOSOPHY_KEY, JSON.stringify(data));
};

export const getResume = (): ResumeData => {
  const stored = localStorage.getItem(RESUME_KEY);
  if (!stored) return initialResume;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialResume;
  }
};

export const saveResume = (data: ResumeData) => {
  localStorage.setItem(RESUME_KEY, JSON.stringify(data));
};
