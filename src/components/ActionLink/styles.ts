import Link from 'next/link'
import { styled } from '@/styles/stitches.config'

export const LinkContainer = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  padding: '$2 $3',
  fontSize: '$sm',
  fontWeight: '$bold',
  background: 'transparent',
  color: '#8381D9',
  borderRadius: '$sm',
  transition: 'color 200ms ease',

  '&:hover': {
    background: 'rgba(131, 139, 217, 0.06)',
  },
})
