interface Community {
    _id: string;
    title: string;
    description: string;
    img: string;
    price: string;
    admin: string;
    createdAt: Date;
    updatedAt: Date;
    members: string[];
}

type ActionResponse<T = null> = {
    success: boolean;
    data?: T;
    error?: {
      message: string;
      details?: Record<string, string[]>;
    };
    status?: number;
};
  
  type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
  type ErrorResponse = ActionResponse<undefined> & { success: false };
  
  type APIErrorResponse = NextResponse<ErrorResponse>;
  type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}