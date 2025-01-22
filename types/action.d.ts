interface SignInWithOAuthParams {
    provider: "github" | "google";
    providerAccountId: string;
    user: {
      email: string;
      name: string;
      image: string;
      username: string;
    };
  }

interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface dummyParams {
  title: string;
  description: string;
  date: Date;
  price: number;
  imageUrl: string;
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
    id?: string;
    dynamicFields?: {
      namelabel?: string;
      label?: string;
      type?: "text" | "number" | "select" | "textarea";
      options?: string[] | undefined;
      value?: string | number | string[];
    }[] | []; // Reflect schema's default
  }[] | [];
  communityId: string;
  createdBy: string;
  groupDetails?: {
    name?: string;
    members?: string[];
  }[] | [];
}


// interface CreateEventParams {
//   title: string;
//   description: string;
//   date: Date;
//   price: number;
//   type: "individual" | "group";
//   teamSize?: number;
//   label?: string;
//   inputType?: "text" | "number" | "select" | "textarea";
//   options?: string;
//   dynamicFields?: {
//     name?: string;
//     label?: string;
//     type?: "text" | "number" | "select" | "textarea";
//     options?: string[];
//     value?: string | number | string[];
//   }[];
//   participants?: {
//     id?: string; // Replace with ObjectId type if needed
//     dynamicFields?: {
//       name?: string;
//       label?: string;
//       type?: "text" | "number" | "select" | "textarea";
//       options?: string[];
//       value?: string | number | string[];
//     }[];
//   }[];
//   communityId: string;
//   createdBy: string;
//   groupDetails?: {
//     name?: string;
//     members?: string[];
//   };
// }



interface CreateCommunityParams {
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  price: string;
  linkedin?: string;
  x?: string;
  github?: string;
  instagram?: string;
  whatsapp?: string;
  website?: string;
}


interface EditCommunityParams extends CreateCommunityParams {
  communityId: string;
}

interface GetCommunityParams {
  communityId: string;
}

interface GetEventParams {
  eventId: string;
}

interface UpdateEventParticipantsParams {
  eventId: string;
  participantId: string;
  datadynamicFields: {
    namelabel?: string;
    label?: string;
    type?: "text" | "number" | "select" | "textarea";
    options?: string[];
    value?: string | number | string[];
  }[];
  newGroup: {
    name: string;
    members: string[];
  }
  groupAction?: "create" | "join";
}