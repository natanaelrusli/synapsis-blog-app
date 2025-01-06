export type ApiResponse<T> = {
  status: number;
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