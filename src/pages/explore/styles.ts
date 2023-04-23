import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 48,
})

export const SearchForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  h1: {
    fontSize: '$2xl',
    fontWeight: '$bold',
    flexGrow: 1,
  },
})
