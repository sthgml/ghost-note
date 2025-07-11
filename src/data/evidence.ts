import { Evidence, ChecklistItem } from '../types/ghost';

export const EVIDENCES: Evidence[] = [
  {
    id: 'emf5',
    name: 'EMF 5단계',
    description: 'EMF 측정기로 5단계 신호를 감지'
  },
  {
    id: 'spiritBox',
    name: '주파수 측정기',
    description: '유령과 음성으로 소통 가능'
  },
  {
    id: 'uv',
    name: 'UV 자외선',
    description: '손자국, 발자국, 지문을 자외선으로 확인'
  },
  {
    id: 'ghostOrb',
    name: '고스트 오브',
    description: '비디오 카메라로만 보이는 구체형 유령'
  },
  {
    id: 'ghostWriting',
    name: '고스트 라이팅',
    description: '유령이 수첩에 글을 씀'
  },
  {
    id: 'freezing',
    name: '서늘함',
    description: '온도계로 0°C 이하 온도 감지'
  },
  {
    id: 'dots',
    name: '도트 프로젝터',
    description: '도트 프로젝터로 유령의 실루엣 확인'
  }
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'roomChanged',
    name: '유령 방 변경됨',
    description: '유령이 다른 방으로 이동했는지 확인',
    type: 'other'
  },
  {
    id: 'lightsOff',
    name: '불 끔',
    description: '유령이 불을 끄는 행동을 했는지 확인',
    type: 'other'
  }
];

export const EVIDENCE_NAMES: { [key: string]: string } = {
  'emf5': 'EMF 5단계',
  'spiritBox': '주파수 측정기',
  'uv': 'UV 자외선',
  'ghostOrb': '고스트 오브',
  'ghostWriting': '고스트 라이팅',
  'freezing': '서늘함',
  'dots': '도트 프로젝터'
};