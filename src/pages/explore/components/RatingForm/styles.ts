import * as RadioGroup from '@radix-ui/react-radio-group'
import { styled } from '@/styles/stitches.config'

export const FormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6',
  borderRadius: '$md',
  background: '$gray700',
})

export const Heading = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  strong: {
    color: '$gray100',
    flexGrow: 1,
  },
})

export const RadioGroupRoot = styled(RadioGroup.Root, {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
})

export const RadioGroupItem = styled(RadioGroup.Item, {
  all: 'unset',
  background: 'transparent',
  cursor: 'pointer',

  svg: {
    color: '$purple100',
    width: 28,
    height: 28,
  },
})

export const SubmitContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  gap: '$2',
})

const Button = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  padding: '$2',
  borderRadius: '$sm',
  background: '$gray600',
  cursor: 'pointer',

  svg: {
    width: 24,
    height: 24,
  },
})

export const CancelButton = styled(Button, {
  svg: {
    color: '$purple100',
  },
})

export const ConfirmButton = styled(Button, {
  svg: {
    color: '$green100',
  },
})
