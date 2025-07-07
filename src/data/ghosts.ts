import { Ghost } from '../types/ghost';

export const GHOSTS: Ghost[] = [
  {
    id: 'spirit',
    name: '스피릿',
    evidences: ['emf5', 'spiritBox', 'ghostWriting'],
    description: '가장 기본적인 유령'
  },
  {
    id: 'wraith',
    name: '레이스',
    evidences: ['emf5', 'spiritBox', 'dots'],
    description: '소금을 밟지 못함'
  },
  {
    id: 'phantom',
    name: '팬텀',
    evidences: ['spiritBox', 'dots', 'uv'],
    description: '실체화 시 정신력 감소'
  },
  {
    id: 'poltergeist',
    name: '폴터가이스트',
    evidences: ['spiritBox', 'uv', 'ghostWriting'],
    description: '물건을 강하게 던짐'
  },
  {
    id: 'banshee',
    name: '밴시',
    evidences: ['uv', 'ghostOrb', 'dots'],
    description: '특정 목표물만 공격'
  },
  {
    id: 'jinn',
    name: '진',
    evidences: ['emf5', 'uv', 'freezing'],
    description: '퓨즈를 내릴 수 없음'
  },
  {
    id: 'mare',
    name: '메어',
    evidences: ['spiritBox', 'ghostOrb', 'ghostWriting'],
    description: '어두운 곳에서 더 공격적'
  },
  {
    id: 'revenant',
    name: '레버넌트',
    evidences: ['ghostOrb', 'ghostWriting', 'freezing'],
    description: '플레이어를 보면 매우 빠름'
  },
  {
    id: 'shade',
    name: '셰이드',
    evidences: ['emf5', 'ghostWriting', 'freezing'],
    description: '플레이어가 있을 때 활동 감소'
  },
  {
    id: 'demon',
    name: '데몬',
    evidences: ['uv', 'ghostWriting', 'freezing'],
    description: '정화 향초에 약함'
  },
  {
    id: 'yurei',
    name: '유레이',
    evidences: ['ghostOrb', 'freezing', 'dots'],
    description: '문을 닫아 정신력 감소'
  },
  {
    id: 'oni',
    name: '오니',
    evidences: ['emf5', 'freezing', 'dots'],
    description: '활동적일 때 더 공격적'
  },
  {
    id: 'yokai',
    name: '요괴',
    evidences: ['spiritBox', 'ghostOrb', 'dots'],
    description: '소음에 민감'
  },
  {
    id: 'hantu',
    name: '한투',
    evidences: ['uv', 'ghostOrb', 'freezing'],
    description: '고정 증거: 서늘함'
  },
  {
    id: 'goryo',
    name: '고료',
    evidences: ['emf5', 'uv', 'dots'],
    description: '고정 증거: 도트 프로젝터'
  },
  {
    id: 'myling',
    name: '마일링',
    evidences: ['emf5', 'uv', 'ghostWriting'],
    description: '발소리가 들리지 않음'
  },
  {
    id: 'onryo',
    name: '원령',
    evidences: ['spiritBox', 'ghostOrb', 'freezing'],
    description: '양초를 끄면 공격적'
  },
  {
    id: 'twins',
    name: '트윈스',
    evidences: ['emf5', 'spiritBox', 'freezing'],
    description: '2연속 상호작용'
  },
  {
    id: 'raiju',
    name: '라이주',
    evidences: ['emf5', 'ghostOrb', 'dots'],
    description: '전자기기 근처에서 빠름'
  },
  {
    id: 'obake',
    name: '오바케',
    evidences: ['emf5', 'uv', 'ghostOrb'],
    description: '고정 증거: UV 자외선'
  },
  {
    id: 'mimic',
    name: '미믹',
    evidences: ['spiritBox', 'uv', 'freezing'],
    description: '다른 유령을 모방, 고스트 오브는 약점'
  },
  {
    id: 'moroi',
    name: '모로이',
    evidences: ['spiritBox', 'ghostWriting', 'freezing'],
    description: '고정 증거: 주파수 측정기'
  },
  {
    id: 'deogen',
    name: '데오겐',
    evidences: ['spiritBox', 'ghostWriting', 'dots'],
    description: '고정 증거: 주파수 측정기'
  },
  {
    id: 'thaye',
    name: '타예',
    evidences: ['ghostOrb', 'ghostWriting', 'dots'],
    description: '시간이 지날수록 약해짐'
  },
]; 