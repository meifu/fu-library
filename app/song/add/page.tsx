import SongForm from '../../_components/SongForm';
import BasicContainer from '../../_components/BasicContainer';
import { createSong } from '../../../lib/action';
import Title from '../../_components/Title';

export default function Page() {
  return (
    <BasicContainer>
      <Title variant="h3" mb={3} text="Add song" />
      <SongForm onSubmit={createSong} />
    </BasicContainer>
  );
}
