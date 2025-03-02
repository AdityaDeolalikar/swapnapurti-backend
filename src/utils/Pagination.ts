import { Model } from "mongoose";

export const findWithPagination = async <T>(
  model: Model<T>,
  query = {},
  pagination = { page: 1, size: 20 },
  options = {}
) => {
  const { page = 1, size = 20 } = pagination;
  const offset = (+page - 1) * +size;
  const limit = +size;

  // Fetch the paginated results and total document count in parallel
  const [items, totalDocuments] = await Promise.all([
    model.find(query, undefined, {
      ...options,
      limit,
      skip: offset,
    }),
    model.countDocuments(query),
  ]);

  return {
    items,
    metadata: {
      currentPage: +page,
      totalPages: Math.ceil(totalDocuments / limit) || null,
      currentCount: items?.length || 0,
      totalCount: totalDocuments,
      size: +limit,
      offset,
      hasNextPage: totalDocuments > +page * limit,
      hasPreviousPage: +page > 1,
    },
  };
};
