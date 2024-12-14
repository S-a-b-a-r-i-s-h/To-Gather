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
  image: string;
  price: string;
}

interface EditCommunityParams extends CreateCommunityParams {
  communityId: string;
}

interface GetCommunityParams {
  communityId: string;
}