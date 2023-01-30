export const categoryList = (categoryNumber: number) => {
  switch (categoryNumber) {
    case 1001: return '인기매물';
    case 1002: return '디지털기기';
    case 1003: return '생활가전';
    case 1004: return '가구/인테리어';
    case 1005: return '생활/주방';
    case 1006: return '유아동';
    case 1007: return '유아도서';
    case 1008: return '여성의류';
    case 1009: return '여성잡화';
    case 1010: return '남성패션/잡화';
    case 1011: return '뷰티/미용';
    case 1012: return '스포츠/레저';
    case 1013: return '취미/게임/음반';
    case 1014: return '도서';
    case 1015: return '중고차';
    case 1016: return '티켓/교환권';
    case 1017: return '가공식품';
    case 1018: return '반려동물용품';
    case 1019: return '식물';
    case 1020: return '기타 중고물품';
    case 1021: return '삽니다';
    default: return null;
  }
}

export const reverseCategoryList = (categoryName: string) => {
  switch (categoryName) {
    case '인기매물': return 1001;
    case '디지털기기': return 1002;
    case '생활가전': return 1003;
    case '가구/인테리어': return 1004;
    case '생활/주방': return 1005;
    case '유아동': return 1006;
    case '유아도서': return 1007;
    case '여성의류': return 1008;
    case '여성잡화': return 1009;
    case '남성패션/잡화': return 1010;
    case '뷰티/미용': return 1011;
    case '스포츠/레저': return 1012;
    case '취미/게임/음반': return 1013;
    case '도서': return 1014;
    case '중고차': return 1015;
    case '티켓/교환권': return 1016;
    case '가공식품': return 1017;
    case '반려동물용품': return 1018;
    case '식물': return 1019;
    case '기타 중고물품': return 1020;
    case '삽니다': return 1021;
    default: return 1001;
  }
}

export const category = [
  {
    id: 1001,
    name: '인기매물'
  },
  {
    id: 1002,
    name: '디지털기기'
  },
  {
    id: 1003,
    name: '생활가전'
  },
  {
    id: 1004,
    name: '가구/인테리어'
  },
  {
    id: 1005,
    name: '생활/주방'
  },
  {
    id: 1006,
    name: '유아동'
  },
  {
    id: 1007,
    name: '유아도서'
  },
  {
    id: 1008,
    name: '여성의류'
  },
  {
    id: 1009,
    name: '여성잡화'
  },
  {
    id: 1010,
    name: '남성패션/잡화'
  },
  {
    id: 1011,
    name: '뷰티/미용'
  },
  {
    id: 1012,
    name: '스포츠/레저'
  },
  {
    id: 1013,
    name: '취미/게임/음반'
  },
  {
    id: 1014,
    name: '도서'
  },
  {
    id: 1015,
    name: '티켓/교환권'
  },
  {
    id: 1016,
    name: '가공식품'
  },
  {
    id: 1017,
    name: '반려동물용품'
  },
  {
    id: 1018,
    name: '식물'
  },
  {
    id: 1019,
    name: '기타 중고물품'
  },
  {
    id: 1020,
    name: '인기매물'
  },
  {
    id: 1021,
    name: '삽니다'
  }
]
