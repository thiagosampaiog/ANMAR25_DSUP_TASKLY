export function getPaginationParams(query: any) {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const skip = (page - 1) * limit;

  return { skip, take: limit };
}
