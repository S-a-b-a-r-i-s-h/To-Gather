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