import * as RadioGroup from '@radix-ui/react-radio-group'
import { styled } from '@/styles/stitches.config'

export const Root = styled(RadioGroup.Root, {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const Item = styled(RadioGroup.Item, {
  padding: '$1 $4',
  border: '1px solid $purple100',
  borderRadius: '$full',
  background: 'transparent',
  color: '$purple100',

  '&:hover': {
    background: '$purple200',
    color: '$gray100',
    cursor: 'pointer',
  },

  '&[data-state=checked]': {
    border: '1px solid $purple200',
    background: '$purple200',
    color: '$gray100',
  },
})
