import Link from 'next/link'
import { styled } from '@/styles/stitches.config'

export const LinkContainer = styled(Link, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  color: '$gray400',
  transition: 'color 200ms ease',

  '&:hover': {
    color: '$gray100',
  },

  variants: {
    isActive: {
      true: {
        fontWeight: '$bold',
        color: '$gray100',
      },
    },
  },
})

export const Indicator = styled('span', {
  position: 'absolute',
  left: -16,
  width: 4,
  height: 24,
  borderRadius: '$full',
  background: '$gradient-vertical',
})
