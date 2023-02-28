export const postcategory = (categoryNumber: string | undefined) => {
  switch (categoryNumber) {
    case '2001':
      return '동네질문';
    case '2002':
      return '동네사건사고';
    case '2003':
      return '겨울간식';
    case '2004':
      return '동네소식';
    case '2005':
      return '동네맛집';
    case '2006':
      return '취미생활';
    case '2007':
      return '일상';
    case '2008':
      return '분실/실종센터';
    case '2009':
      return '해주세요';
    case '2010':
      return '동네사진전';
    case undefined:
      return null;
    default:
      return null;
  }
};

export const reversePostcategory = (categoryName: string) => {
  switch (categoryName) {
    case '동네질문':
      return 2001;
    case '동네사건사고':
      return 2002;
    case '겨울간식':
      return 2003;
    case '동네소식':
      return 2004;
    case '동네맛집':
      return 2005;
    case '취미생활':
      return 2006;
    case '일상':
      return 2007;
    case '분실/실종센터':
      return 2008;
    case '해주세요':
      return 2009;
    case '동네사진전':
      return 2010;
    default:
      return 2001;
  }
};

export const postcategoryList = [
  {
    title: '주제',
    path: '',
  },
  {
    title: '반짝모임',
    path: '',
  },
  {
    title: '겨울간식',
    path: '/category/2003',
    img: 'https://mblogthumb-phinf.pstatic.net/MjAxOTExMTRfNjEg/MDAxNTczNjk0NDQ1Njg1.ngZvdPRL1BpgtvzpzKaoYpPvNbghef-eCIGEjjJNnlIg.fPwLwjKtnbAcVHm0yQ1X6tDCc3m1rF2PwSANfhSqonAg.JPEG.msinvestment/%EA%B3%A0%EA%B5%AC%EB%A7%88_%EC%82%AC%EC%A7%84_(8).jpg?type=w800',
  },
  {
    title: '동네소식',
    path: '/category/2004',
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA4MjJfMTIy%2FMDAxNTM0OTAyMjI3NDA2.XzH5ksp7ZZnKM1WNNPeara9ADtvxFWf813Ljd8-xdJAg.Qsbtx5-0yAvsle7EIcwr2L61vxSyIDxMLSRWH4g5uagg.JPEG.maumejoayong%2FKakaoTalk_20180810_151540927.jpg&type=sc960_832',
  },
  {
    title: '동네질문',
    path: '/category/2001',
    img: 'https://st2.depositphotos.com/1751332/7356/i/450/depositphotos_73561841-stock-photo-question-mark-on-blackboard.jpg',
  },
  {
    title: '동네맛집',
    path: '/category/2005',
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEyMzFfMzcg%2FMDAxNjQwOTI4NTg0MTMw.C0Qqz5vkFevikYlIvZq1fn7Mj0t4GfsFBpxhft_8ZbUg.wpuGLE0xfGxSlalwBIqG_PAwBenSwIfgPUazrQL2mLog.JPEG.tjduswn0924%2FIMG_7648.jpg&type=sc960_832',
  },
  {
    title: '취미생활',
    path: '/category/2006',
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDExMjJfODIg%2FMDAxNjA1OTcxMjYyMTI0.O4mY7jcsXGej-OTKo3025gndGJK2gfkCzdUs8m_JqkIg.i0gJn9hgKS5gCOaHTi4sqLb1-WvmEtUXL47eCR2KiJ0g.JPEG.andrichrich%2FIMG%25A3%25DF20201118%25A3%25DF204554.jpg&type=sc960_832',
  },
  {
    title: '일상',
    path: '/category/2007',
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMjRfMTM3%2FMDAxNjc0NDk2Nzc2MzUx.zt4pQQVmZXDHfn15sPBmnVSe79OYHbogRFxeB3kKx-0g.sQwK_E_NcqVelUJ9Ihb7Giqtkxj0Jp8aygxVHGv6cQsg.JPEG.lovemw3%2F%25B5%25B5%25C4%25EC%25BF%25A9%25C7%25E0_%252824%2529.jpg&type=sc960_832',
  },
  {
    title: '분실/실종센터',
    path: '/category/2008',
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEwMTZfMjQx%2FMDAxNTcxMjEyOTc0NDk3.9dUIAqtsi1CsRjyHuehOAmtUhpJTYDZpoEyh04dCsI8g.LKIBbMaYWplk5be061CiUy8E8TsOaisNz0Lrr_hP_5Qg.JPEG.canonkoreacamera%2F%25BB%25A7%25BD%25C7.jpg&type=sc960_832',
  },
  {
    title: '동네사건사고',
    path: '/category/2002',
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MDNfMTEz%2FMDAxNjYyMTUxOTk2MzQ0.TfBB-Izi0_FcrIRSLiX-hh-2HzcWI3wbu-mGXhQk4W0g.KHHtJNIUSvELz5AOmSwnOsx6tJXa8K-XPNJ0__2npMYg.JPEG.milkhaila_%2F%25B6%25F3%25C0%25CC%25C6%25AE%25BE%25D8_%25C3%25D4%25BF%25B5%25BC%25D2%25C7%25B0_%25283%2529.jpg&type=sc960_832',
  },
  {
    title: '해주세요',
    path: '/category/2009',
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDRfMjk5%2FMDAxNjI4MDU5ODAzODA1.aZ7QBMD0DHsqjErSMh5ls-RhWdpG3N6pxGug8_XY8xkg.g843FMxYTOpsvozHH6iPbvulqBIfiVkzn1VuMeN0omAg.JPEG.gytn7906%2Flp.JPG&type=sc960_832',
  },
  {
    title: '동네사진전',
    path: '/category/2010',
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMjhfMjkg%2FMDAxNjQ4Mzk3ODMzODM5.0vnF6XeZRO2Vy5aCbkCjw-HtszW9EsAUJ73gO0NO7DYg.21TodPUnafKbvHmIdleYJGI6tSLgqDY0QsWOmdbIuq8g.JPEG.bling44%2F20210326%25A3%25DF162038.jpg&type=sc960_832',
  },
];
