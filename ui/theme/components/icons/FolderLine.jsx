import { Icon } from '@chakra-ui/react'
import React from 'react'

export function FolderLine(props) {
  return (
    <Icon viewBox='0 0 20 18' {...props}>
      <path
        d='M2 2V16H18V4H9.586L7.586 2H2ZM10.414 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H8.414L10.414 2Z'
        fill='currentColor'
      />
    </Icon>
  )
}