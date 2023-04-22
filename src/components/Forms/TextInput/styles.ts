import { styled } from '@/styles/stitches.config'

export const FieldContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '$3 $5',
  boxSizing: 'border-box',
  border: '2px solid $gray500',
  borderRadius: '$sm',

  svg: {
    width: 20,
    height: 20,
    color: '$gray500',
  },

  '&:focus-within': {
    borderColor: '$green200',
  },

  '&.disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

export const Input = styled('input', {
  width: '100%',
  border: 0,
  backgroundColor: 'transparent',
  fontFamily: '$default',
  fontWeight: '$regular',
  fontSize: '$sm',
  color: '$gray200',

  '&:focus + svg': {
    color: '$green200',
  },

  '&:focus': {
    outline: 0,
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: '$gray400',
  },
})

export const IconContainer = styled('div', {})
