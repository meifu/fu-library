import React, { ReactNode } from 'react';

import Box from '@mui/material/Box';

interface Props {
  children: ReactNode;
}

export default function ListPageWrap({ children }: Props) {
  return (
    <Box width={600} sx={{ margin: '30px auto 0' }}>
      {children}
    </Box>
  );
}
