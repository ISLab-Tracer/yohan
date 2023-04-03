const USER_RANK = [
  { id: 0, title: '주임 연구원', value: 'ASSISTANT' },
  { id: 1, title: '선임 연구원', value: 'RESEARCH' },
  { id: 2, title: '책임 연구원', value: 'SENIOR' },
  { id: 3, title: '수석 연구원', value: 'PRINCIPAL' },
  { id: 4, title: '박사(과정)', value: 'PHD' },
  { id: 5, title: '석사(과정)', value: 'MASTER' },
  { id: 6, title: '기타', value: 'ETC' },
];

const TypeManager = {
  getUserRankList: () => {
    return USER_RANK;
  },
  getUserRank: (val) => {
    const [temp] = USER_RANK.filter((item) => {
      return val === item.value;
    });

    return temp ? temp : '';
  },
};

export default TypeManager;
