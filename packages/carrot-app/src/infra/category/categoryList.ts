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
