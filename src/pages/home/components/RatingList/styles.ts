import { styled } from '@/styles/stitches.config'

export const ListContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})

export const RatingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
})

export const RatingHeader = styled('div', {
  display: 'flex',
  gap: '$4',
})

export const UserData = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,

  span: {
    color: '$gray100',
  },

  time: {
    color: '$gray400',
    fontSize: '$sm',
  },
})

export const RatingBody = styled('div', {
  display: 'flex',
  gap: '$5',
})

export const RatingBodyContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  p: {
    color: '$gray300',
    fontSize: '$sm',
  },
})

export const BookInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  strong: {
    color: '$gray100',
  },

  span: {
    color: '$gray400',
    fontSize: '$sm',
  },
})
