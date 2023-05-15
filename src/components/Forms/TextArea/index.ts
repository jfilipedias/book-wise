import { styled } from '@/styles/stitches.config'

export const TextArea = styled('textarea', {
  boxSizing: 'border-box',
  minHeight: 164,
  padding: '$3 $5',
  border: '2px solid $gray500',
  borderRadius: '$sm',
  backgroundColor: '$gray800',
  fontSize: '$sm',
  color: '$gray200',
  resize: 'vertical',

  '&:focus': {
    outline: 0,
    borderColor: '$green200',
  },
})

TextArea.displayName = 'TextArea'
