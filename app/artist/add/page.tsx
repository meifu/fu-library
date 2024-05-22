import { createArtist } from '../../../lib/action';
import ArtistForm from '../../_components/ArtistForm';
import BasicContainer from '../../_components/BasicContainer';
import Title from '../../_components/Title';

export default function Page() {
  return (
    <BasicContainer>
      <Title variant="h3" mb={3} text="Add artist" />
      <ArtistForm onSubmit={createArtist} />
    </BasicContainer>
  );
}
