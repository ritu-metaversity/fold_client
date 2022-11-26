import { Box } from '@mui/system';
import React, { FC, PropsWithChildren } from 'react'
import { BoxWithTitleBox, Title } from './styledComponents';


interface BoxProps extends PropsWithChildren {
    title: string;
}
const BoxWithTitle:FC<BoxProps> = ({title, children}) => {
    return (
      <Box>
        <Title>{title}</Title>
        <BoxWithTitleBox>{children}</BoxWithTitleBox>
      </Box>
    );
}

export default BoxWithTitle