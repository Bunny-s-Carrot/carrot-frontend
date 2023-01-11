
import styled from 'styled-components'
import theme from '../../style/theme'

interface PercentageProgressBarProps {
  value: number
}

const PercentageProgressBar = (props: PercentageProgressBarProps) => {
  return (
    <Wrapper>
      <Temperature>
        {`${props.value}°C`}
      </Temperature>
      <SliderBackground>
        <SliderIndicator value={props.value} />
      </SliderBackground>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const SliderBackground = styled.div`
  overflow: hidden;
  background-color: ${theme.colors.grey30};
  width: 100%;
  height: 0.6rem;
  border-radius: 10rem;
`

const SliderIndicator = styled.div<{ value: number; maxValue?: number }>`
  width: ${(props) => `${props.value}%`};
  height: 100%;
  background: ${theme.colors.carrot};
`

const Temperature = styled.p`
  text-align: end;
  color: ${theme.colors.grey50};
  ${theme.typography.caption1}
`
export default PercentageProgressBar
