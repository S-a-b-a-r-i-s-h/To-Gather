// import { Url } from "url";

interface Community {
    _id: string;
    title: string;
    description: string;
    shortDescription: string;
    img: string;
    price: string;
    admin: string;
    secondaryAdmins: string[];
    createdAt: Date;
    updatedAt: Date;
    members: string[];
    linkedin?: string;
    x?: string;
    github?: string;
    instagram?: string;
    whatsapp?: string;
    website?: string;
}

interface Events {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
  price: number;
  type: "individual" | "group";
  teamSize?: number;
  label?: string;
  inputType?: "text" | "number" | "select" | "textarea";
  options?: string | undefined; // Match schema's behavior
  dynamicFields?: {
    namelabel?: string;
    label?: string;
    type?: "text" | "number" | "select" | "textarea";
    options?: string[] | undefined; // Explicit undefined
    value?: string | number | string[];
  }[] | []; // Reflect schema's default
  participants?: {
    participantId?: string;
    dynamicFields?: {
      namelabel?: string;
      label?: string;
      type?: "text" | "number" | "select" | "textarea";
      options?: string[] | undefined;
      value?: string | number | string[];
    }[] | []; // Reflect schema's default
  }[] | [];
  community: string;
  createdBy: string;
  groupDetails?: {
    _id?: string;
    name?: string;
    members?: string[];
  }[];
}

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  userLocation?: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  communities?: string[];
}

interface UpdateCommunityMembersParams {
    communityId: string;
    actions: "add" | "remove" | "upgrade" | "downgrade";
    memberId?: string;
}

interface GradeCommunityMembersParams {
  communityId: string;
  actions: "upgrade" | "downgrade";
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
  id?: string;
}