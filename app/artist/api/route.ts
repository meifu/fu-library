import { NextRequest } from 'next/server';
import prismadb from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const data = await prismadb.artist.findUnique({
      where: {
        id: id || '',
      },
    });
    return Response.json({ data, message: 'success', status: 200 });
  } catch (error) {
    return Response.json({ message: 'Get artist data error' });
  } finally {
    prismadb.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  const req = await request.json();
  console.log('enter delete', req);

  try {
    const deleteArtist = await prismadb.artist.delete({
      where: { id: req.id },
    });
    console.log('========', deleteArtist);
    return Response.json({ deleteArtist, isSuccess: true });
  } catch (error) {
    console.log({ error });
    return Response.json({ message: `Database Error: Failed to Delete Artist ${req.id}.`, isSuccess: false });
  } finally {
    prismadb.$disconnect();
  }
}