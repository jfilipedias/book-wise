import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
})

export const HeadingContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  h1: {
    color: '$gray100',
    fontSize: '$2xl',
  },

  svg: {
    color: '$green100',
    width: 32,
    height: 32,
  },
})
