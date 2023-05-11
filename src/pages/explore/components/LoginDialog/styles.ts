import * as Dialog from '@radix-ui/react-dialog'
import { keyframes, styled } from '@/styles/stitches.config'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$10',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '56px 72px',
  borderRadius: '$lg',
  background: '$gray700',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.5)',
  animation: `${contentShow} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const DialogTitle = styled(Dialog.Title, {
  fontSize: '$md',
})

export const DialogClose = styled(Dialog.Close, {
  position: 'absolute',
  top: '$6',
  right: '$6',
  background: 'transparent',
  border: 0,
  cursor: 'pointer',

  svg: {
    width: 24,
    height: 24,
    color: '$gray400',
  },
})

export const LoginOptions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  width: '100%',
  minWidth: 372,

  button: {
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
