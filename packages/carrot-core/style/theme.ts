import { css } from 'styled-components';

const colors = {
  orange: '#FF8A3D',
  green: '#339F46',
  blue: '#2B96AD',
  grey70: '#C1C7CD',
  grey10: '#F8F9FA'
} as const

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
export default { colors, option };