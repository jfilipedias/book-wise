import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  width: '100%',

  'a, button': {
    display: 'flex',
    alignItems: 'center',
    gap: '$5',
    width: '100%',
    padding: '$5 $6',
    border: 0,
    borderRadius: '$md',
    background: '$gray600',
    color: '$gray200',
    fontSize: '$lg',
    fontWeight: '$bold',
    cursor: 'pointer',
  },
})
