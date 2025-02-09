export async function GET(response: Response) {
  const result = 'pong';
  return Response.json(result);
}
