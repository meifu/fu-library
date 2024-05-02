import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { deepPurple } from '@mui/material/colors';

import Image from 'next/image';

import BasicContainer from './_components/BasicContainer';
import Title from './_components/Title';

interface TechData {
  key: number;
  label: string;
  img?: string;
}

const techs: TechData[] = [
  { key: 0, label: 'react.js', img: 'images/icons/reactjs.svg' },
  { key: 1, label: 'Next.js', img: 'images/icons/nextjs.svg' },
  { key: 2, label: 'MongoDB', img: 'images/icons/mongodb.svg' },
  { key: 3, label: 'Prisma', img: 'images/icons/prisma.svg' },
  { key: 4, label: 'Typescript', img: 'images/icons/typescript.svg' },
  { key: 5, label: 'Zod', img: 'images/icons/zod.svg' },
  { key: 6, label: 'Material UI', img: 'images/icons/material-ui.svg' },
  { key: 7, label: 'eslint', img: 'images/icons/eslint.svg' },
  { key: 8, label: 'prettier', img: 'images/icons/prettier.svg' },
  { key: 9, label: 'NextAuth' },
  { key: 10, label: 'jest' },
  { key: 11, label: 'react testing library' },
  { key: 12, label: 'Formik' },
  { key: 13, label: 'Github Action' },
  { key: 14, label: 'Vercel' },
];

// const TechImage = ({ name }: { name?: string }) => {
//   return name ? (
//     <Image
//       src={`/images/icons/${name}.svg`}
//       alt={name}
//       width={50}
//       height={50}
//     />
//   ) : (
//     ''
//   );
// };

export default function Page() {
  return (
    <main>
      <BasicContainer>
        <Title text="Welcome!" variant="h2" />

        <Typography variant="body1">
          Just sharing some cool music and also practicing my web development
          skills. I have not finished it yet and will keep on working!
        </Typography>

        <Box display="flex" width="100%" justifyContent="center" mt={5} mb={5}>
          <Image
            src="/images/mainListen.svg"
            width={161}
            height={264}
            alt="main listen music"
          />
        </Box>

        <Card>
          <CardContent>
            <CardHeader
              title="Tech Stacks"
              titleTypographyProps={{ variant: 'h6' }}
            />
            {techs.map((t, i) => {
              const avatar = <Avatar alt={t.label} src={t.img} />;
              return (
                <Chip
                  key={i}
                  label={t.label}
                  {...(t.img && { avatar })}
                  sx={{ marginRight: '5px', marginBottom: '5px' }}
                />
              );
            })}
            <div>
              <Typography variant="body2" mt={3} ml={2}>
                Plan to do: Search and debounce, add more test, Cypress
              </Typography>
            </div>
          </CardContent>
        </Card>

        <Box
          mt={3}
          padding={2}
          borderRadius={2}
          fontSize="12px"
          boxShadow={1}
          border="solid"
          borderColor={deepPurple['A100']}
        >
          <Typography variant="body1" color={deepPurple['A100']}>
            PS. I am looking for a frontend job now. Please drop me a message if
            you know there is any opportunities. <br />
          </Typography>
          <Box
            mt="5px"
            display="flex"
            alignItems="center"
            color={deepPurple['A100']}
          >
            <MailOutlineIcon fontSize="small" sx={{ marginRight: '5px' }} />
            <Typography variant="body1">schwarzmeifu@gmail.com</Typography>
          </Box>
        </Box>
      </BasicContainer>
    </main>
  );
}
