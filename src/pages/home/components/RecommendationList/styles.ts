import { styled } from '@/styles/stitches.config'

export const ListContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})

export const RecommendationContainer = styled('div', {
  display: 'flex',
  gap: '$5',
})

export const RecommendationContent = styled('div', {
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
