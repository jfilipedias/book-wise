import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { keyframes, styled } from '@/styles/stitches.config'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(100px, 0)' },
  '100%': { opacity: 1, transform: 'translate(0, 0)' },
})

export const DialogRoot = Dialog.Root

export const DialogTrigger = Dialog.Trigger

export const DialogPortal = Dialog.Portal

export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  animation: `${overlayShow} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const DialogContent = styled(Dialog.Content, {
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  top: 0,
  bottom: 0,
  right: 0,
  width: '660px',
  padding: '0 48px 48px 48px',
  overflowY: 'auto',
  background: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.5)',
  animation: `${contentShow} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const DialogTitle = Dialog.Title

export const DialogClose = styled(Dialog.Close, {
  position: 'absolute',
  right: 48,
  marginTop: '$6',
  background: 'transparent',
  border: 0,
  cursor: 'pointer',

  svg: {
    width: 24,
    height: 24,
    color: '$gray400',
  },
})

export const BookSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  marginTop: 64,
  padding: '24px 32px 16px',
  width: '100%',
  borderRadius: '$md',
  background: '$gray700',
})

export const BookContent = styled('div', {
  display: 'flex',
  gap: '$8',
})

export const BookInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const BookTitle = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  h2: {
    fontSize: '$lg',
  },

  span: {
    color: '$gray300',
  },
})

export const BookRating = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',

  span: {
    color: '$gray400',
    fontSize: '$sm',
  },
})

export const BookAbout = styled('div', {
  display: 'flex',
  gap: 56,
  padding: '24px 0',
  borderTop: '1px solid $colors$gray600',
})

export const BookStats = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  padding: '0 4px',

  svg: {
    width: 24,
    height: 24,
    color: '$green100',
  },
})

export const StatsContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  span: {
    color: '$gray300',
    fontSize: '$sm',
  },
})

export const RatingsSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const RatingsTitle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  h3: {
    color: '$gray200',
    fontSize: '$sm',
    fontWeight: '$regular',
  },

  button: {
    all: 'unset',
    padding: '$1 $2',
    borderRadius: '$sm',
    color: '$purple100',
    fontWeight: '$bold',
    cursor: 'pointer',
  },
})

export const RatingsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})

export const RatingContainer = styled(Link, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
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
