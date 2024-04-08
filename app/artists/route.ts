import prismadb from '@/lib/db';

export async function GET(request: Request) {
  try {
    const data = await prismadb.artist.findMany();
    return Response.json({ data, message: 'success', status: 200 });
  } catch (error) {
    return Response.json({ message: 'Get artist data error' });
  } finally {
    prismadb.$disconnect();
  }
}