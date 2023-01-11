
import styled from 'styled-components'
import theme from '@carrot/core/style/theme'
import { colorAndEmoji } from '../../infra/mannerTemp/colorAndEmoji'

interface MannerTempProps {
  type: 'BIG' | 'SMALL';
  value: number;
}

const MannerTemp = (props: MannerTempProps) => {
  if (props.type === 'SMALL') {
    return (
      <Wrapper>
        <TemperatureWrapper>
          <Temperature value={props.value}>
            {props.value 
            ? `${props.value}°C`
            : '0°C'}
          </Temperature>
          <SliderBackground type={props.type}>
            <SliderIndicator value={props.value} />
          </SliderBackground>
        </TemperatureWrapper>
        <Emoji>{colorAndEmoji(props.value)[1]}</Emoji>
      </Wrapper>
    )
  }

  else {
    return (
      <Wrapper>
        <TemperatureWrapper>

        </TemperatureWrapper>
        <Temperature value={props.value}>
          {props.value 
          ? `${props.value}°C`
          : '0°C'}
        </Temperature>
        <SliderBackground type={props.type}>
          <SliderIndicator value={props.value} />
        </SliderBackground>
      </Wrapper>
    )
  }
}

export default MannerTemp

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`
const TemperatureWrapper = styled.div`
`
const SliderBackground = styled.div<{ type: string }>`
  overflow: hidden;
  background-color: ${theme.colors.grey30};
  width: ${props => props.type === 'SMALL' ? '6rem' : '100%'};
  height: 0.5rem;
  border-radius: 10rem;
`

const SliderIndicator = styled.div<{ value: number }>`
  width: ${(props) => props.value ? `${props.value}%` : 0};
  height: 100%;
  background: ${props => colorAndEmoji(props.value)[0]};
`

const Temperature = styled.p<{ value: number }>`
  text-align: right;
  color: ${props => colorAndEmoji(props.value)[0]};
  ${theme.typography.body3};
  font-weight: bold;
`
const Emoji = styled.span`
  font-size: 3rem;
  width: 3.4rem;
`