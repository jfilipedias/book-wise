import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
})

export const BackButton = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  maxWidth: 100,
  padding: '$1 $2',
  color: '$gray200',
  fontWeight: '$bold',
  cursor: 'pointer',

  svg: {
    width: 20,
    height: 20,
  },
})
