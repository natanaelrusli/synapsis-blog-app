export type ApiResponse<T> = {
  data: T;
  meta: {
    pagination: {
      total: number;
      pages: number;
      page: number;
      limit: number;
      links: {
        previous: string | null;
        current: string | null;
        next: string | null;
      }
    }
  } | null
}