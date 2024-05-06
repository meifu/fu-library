import Typography from '@mui/material/Typography';

import { Alegreya_Sans_SC } from 'next/font/google';

const TitleFont = Alegreya_Sans_SC({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
});

interface Props {
  text: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  gutterBottom?: boolean;
  textAlign?: 'center' | 'left' | 'right';
  mt?: number;
  mb?: number;
  pd?: string;
}

export default function Title({
  text = '',
  variant = 'h2',
  gutterBottom = true,
  textAlign = 'center',
  mt,
  mb,
  pd,
}: Props) {
  return (
    <Typography
      variant={variant}
      gutterBottom={gutterBottom}
      fontFamily={TitleFont.style.fontFamily}
      textAlign={textAlign}
      padding={pd}
      mt={mt}
      mb={mb}
    >
      {text}
    </Typography>
  );
}
