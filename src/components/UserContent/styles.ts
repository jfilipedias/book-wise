import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  gap: 64,
})

export const UserRatings = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  flexGrow: 1,
})

export const EmptyListWarning = styled('h2', {
  marginTop: '$5',
  fontSize: '$xl',
  textAlign: 'center',
})

export const RatingsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

export const RatingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  time: {
    color: '$gray300',
    fontSize: '$sm',
    textTransform: 'capitalize',
  },
})

export const RatingContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  p: {
    color: '$gray300',
    fontSize: '$sm',
    lineHeight: '160%',
  },
})

export const BookContainer = styled('div', {
  display: 'flex',
  gap: '$6',
})

export const BookInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  strong: {
    color: '$gray100',
    fontSize: '$lg',
  },

  span: {
    color: '$gray400',
    fontSize: '$sm',
    marginBottom: '$3',
  },
})

export const UserInfo = styled('aside', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'start',
  minWidth: 308,
  borderLeft: '1px solid $colors$gray700',
})

export const UserPersonalData = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  strong: {
    marginTop: '$5',
    color: '$gray100',
    fontSize: '$lg',
  },

  span: {
    color: '$gray400',
    fontSize: '$sm',
  },
})

export const Separator = styled('div', {
  margin: '$8 0',
  width: 32,
  height: 4,
  borderRadius: '$full',
  background: '$gradient-horizontal',
})

export const UserStats = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$10',
  width: '100%',
  padding: '$5 56px',
})

export const StatsContainer = styled('div', {
  display: 'flex',
  alignContent: 'center',
  gap: '$5',
  width: '100%',

  svg: {
    color: '$green100',
    width: 32,
    height: 32,
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,

    strong: {
      color: '$gray100',
    },

    span: {
      color: '$gray300',
      fontSize: '$sm',
    },
  },
})
