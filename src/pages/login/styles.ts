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
