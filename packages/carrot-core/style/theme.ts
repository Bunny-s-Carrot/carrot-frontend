import { css } from 'styled-components';

const colors = {
  yellow: '#F2FF59',
  tomato: '#FF6347',
  carrot: '#FF8B3A',
  red: '#F22D50',
  blue: '#5E5AFF',
  grey90: '#323232',
  grey70: '#616161',
  grey50: '#9E9E9E',
  grey40: '#BDBDBD',
  grey30: '#E0E0E0',
  grey20: '#EEEEEE',
  grey10: '#F5F5F5',
} as const

const typography = {
  heading1: css`
    font-size: 4rem;
    line-height: 4.8rem;
    font-weight: bold;
  `,
  heading2: css`
    font-size: 3.2rem;
    line-height: 4rem;
    font-weight: bold;
  `,
  heading3: css`
    font-size: 2.4rem;
    line-height: 3rem;
    font-weight: bold;
  `,
  heading4: css`
    font-size: 2rem;
    line-height: 2.4rem;
    font-weight: bold;
  `,
  body1: css`
    font-size: 2rem;
    line-height: 2.8rem;
    font-weight: normal;
  `,
  body2: css`
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-weight: normal;
  `,
  body3: css`
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: normal;
  `,
  body4: css`
    font-size: 1.4rem;
    line-height: 2.4rem;
    font-weight: normal;
  `,
  caption1: css`
    font-size: 1.2rem;
    line-height: 1.6rem;
    font-weight: normal;
  `,
  caption2: css`
    font-size: 1rem;
    line-height: 1.4rem;
    font-weight: normal;
  `,
  tag: css`
    font-size: 1rem;
    line-height: 1.2rem;
    font-weight: normal;
  `,
  link: css`
    font-size: 1.4rem;
    line-height: 2.4rem;
    font-weight: bold;
    text-decoration: underline;
  `,
}
const option = {
  hiddenScroll: css`
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  `,
} as const

export type ColorType = typeof colors;
export type OptionType = typeof option;
export default { colors, option, typography };