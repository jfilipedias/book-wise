import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
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
  },
})

export const Content = styled('main', {
  display: 'flex',
  gap: 64,
})

const Section = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const Feed = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  flexGrow: 1,
})

export const FeedSection = styled(Section, {
  flexGrow: 1,
})

export const SideList = styled(Section, {
  minWidth: 324,
})

export const UserRating = styled('div', {
  display: 'flex',
  gap: '$6',
  padding: '$5 $6',
  background: '$gray600',
  borderRadius: '$md',
})

export const UserRatingInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  flexGrow: 1,
})

export const UserRatingInfoHeading = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  color: '$gray300',

  time: {
    fontSize: '$sm',
  },
})

export const UserRatingBook = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '$3',

  strong: {
    color: '$gray100',
  },

  span: {
    color: '$gray400',
    fontSize: '$sm',
  },
})

export const SectionTitle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  h2: {
    fontSize: '$sm',
    fontWeight: '$regular',
  },
})
