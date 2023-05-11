import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  width: '100vw',
  height: '100vh',
})

export const Hero = styled('div', {
  position: 'relative',
  height: 912,
  width: 598,
  margin: 'auto $5',
})

export const LoginContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '$10',
  width: 372,
  margin: 'auto',
})

export const WelcomeContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    fontWeight: '$bold',
  },

  span: {
    fontSize: '$md',
  },
})

export const LoginOptions = styled('div', {
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
