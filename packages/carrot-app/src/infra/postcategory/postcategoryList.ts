export const postcategory = (categoryNumber: string | undefined) => {
  switch (categoryNumber) {
    case "2001": return '동네질문';
    case "2002": return '동네사건사고';
    case "2003": return '겨울간식';
    case "2004": return '동네소식';
    case "2005": return '동네맛집';
    case "2006": return '취미생활';
    case "2007": return '일상';
    case "2008": return '분실/실종센터';
    case "2009": return '해주세요';
    case "2010": return '동네사진전';
    case undefined: return null;
    default: return null;
  }
}

export const reversePostcategory = (categoryName: string) => {
  switch (categoryName) {
    case "동네질문": return 2001;
    case "동네사건사고": return 2002;
    case "겨울간식": return 2003;
    case "동네소식": return 2004;
    case "동네맛집": return 2005;
    case "취미생활": return 2006;
    case "일상": return 2007;
    case "분실/실종센터": return 2008;
    case "해주세요": return 2009;
    case "동네사진전": return 2010;
    default: return 2001;
  }
}

export const postcategoryList = [
  {
    title: "주제",
    path: "",
  },
  {
    title: "반짝모임",
    path: "",
  },
  {
    title: "겨울간식",
    path: "/category/2003",
  },
  {
    title: "동네소식",
    path: "/category/2004",
  },
  {
    title: "동네질문",
    path: "/category/2001",
  },
  {
    title: "동네맛집",
    path: "/category/2005",
  },
  {
    title: "취미생활",
    path: "/category/2006",
  },
  {
    title: "일상",
    path: "/category/2007",
  },
  {
    title: "분실/실종센터",
    path: "/category/2008",
  },
  {
    title: "동네사건사고",
    path: "/category/2002",
  },
  {
    title: "해주세요",
    path: "/category/2009",
  },
  {
    title: "동네사진전",
    path: "/category/2010",
  },
];

