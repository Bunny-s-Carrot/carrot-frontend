import { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';

type ButtonType = 'CARROT' | 'WHITE' | 'GREY';

interface ButtonProps {
    className?: string;
    onClick: (e?: any) => void;
    children: ReactNode;
    disabled?: boolean;
}

interface Props extends ButtonProps {
    buttonType: ButtonType;
}

function Button ({buttonType, className, onClick, children, disabled}: Props) {
    if (buttonType === 'CARROT') {
        return (
            <CarrotButton
                disabled={disabled}
                className={className}
                onClick={() => onClick()}
            >
                {children}
            </CarrotButton>
        )
    } else if (buttonType === 'WHITE') {
        return (
            <WhiteButton
                disabled={disabled}
                className={className}
                onClick={(e) => onClick(e)}
            >
                {children}
            </WhiteButton>
        )
    } else if (buttonType === 'GREY') {
        return (
            <GreyButton
                disabled={disabled}
                className={className}
                onClick={() => onClick()}
            >
                {children}
            </GreyButton>
        )
    } else return null
}

export default Button;

const PrimaryButtonWrapper = styled.button`
  height: 4.2rem;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 0.8rem;
`
const CarrotButton = styled(PrimaryButtonWrapper)`
  background: ${theme.colors.carrot};
  color: white;
  ${theme.typography.heading4};
`
const WhiteButton = styled(PrimaryButtonWrapper)`
  background: white;
  border: 1px solid ${theme.colors.grey30};
`
const GreyButton = styled(PrimaryButtonWrapper)`
  background: ${theme.colors.grey30};
`

