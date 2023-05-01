import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 48,
})

export const Header = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
})

export const Search = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  h1: {
    fontSize: '$2xl',
    fontWeight: '$bold',
    flexGrow: 1,
  },
})

export const ListContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '$5',
  width: '100%',
})

export const BookContainer = styled('div', {
  display: 'flex',
  gap: '$5',
})

export const BookContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const BookInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  strong: {
    maxHeight: 44,
    color: '$gray100',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  span: {
    color: '$gray400',
    fontSize: '$sm',
  },
})
