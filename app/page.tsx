import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import BasicContainer from './components/BasicContainer';
import Title from './components/Title';

export default function Page() {
  return (
    <main>
      <BasicContainer>
        <Title text="Welcome!" variant="h2" />

        <Typography variant="body1">
          Just sharing some cool music and also practicing my web development
          skills. I have not finished it yet and will keep on working!
        </Typography>

        <Typography variant="body1">Tech Stack Plan:</Typography>
        <ul>
          <li>React, Next, App route</li>
          <li>MongoDB, Prisma</li>
          <li>Zod, Typescript</li>
          <li>Eslint, Prettier</li>
          <li>Material UI</li>
          <li>Formik</li>
          <li>Loading, Skeleton</li>
          <li>Next Auth</li>
          <li>Search and debounce</li>
          <li>jest, react-testing-library</li>
          <li>Cypress</li>
          <li>Github Action</li>
          <li>CI/CD</li>
        </ul>

        <Box mt={3} padding={2} borderRadius={2} bgcolor="gainsboro">
          <Typography variant="body2" fontSize="12px">
            PS. I am looking for a frontend job now. Please drop me a message if
            you know there is any opportunities. <br />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '5px',
              }}
            >
              <MailOutlineIcon fontSize="small" sx={{ marginRight: '5px' }} />
              <span>Email: schwarzmeifu@gmail.com</span>
            </div>
          </Typography>
        </Box>
      </BasicContainer>
    </main>
  );
}
