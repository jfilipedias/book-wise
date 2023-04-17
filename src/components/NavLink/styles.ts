import Link from 'next/link'
import { styled } from '@/styles/stitches.config'

interface LinkContainerProps {
  isActive: boolean
}

export const LinkContainer = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  textDecoration: 'none',
  color: '$gray400',
  transition: 'color 200ms ease',

  '&:hover': {
    color: '$gray100',
  },
})
