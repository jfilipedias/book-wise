import { styled } from '@/styles/stitches.config'

export const Card = styled('div', {
  width: '100%',
  borderRadius: '$md',
  background: '$gray700',
  border: '2px solid $gray700',

  '&:hover': {
    border: '2px solid $gray600',
  },

  variants: {
    size: {
      sm: {
        padding: '$5 $4',
      },
      lg: {
        padding: '$6',
      },
    },
    highlighted: {
      true: {
        background: '$gray600',
        border: '2px solid $gray600',

        '&:hover': {
          border: '2px solid $gray500',
        },
      },
    },
  },

  defaultVariants: {
    size: 'lg',
  },
})
