const ROUTES = {
    ROOT: "/",
    HOME: "/home",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    CREATE_COMMUNITY: "/create-community",
    PROFILE: (id: string) => `/profile/${id}`,
    COMMUNITY: (id: string) => `/community/${id}`,
    COMMUNITIES: (id: string) => `/community/${id}`,
    EDITCOMMUNITY: (id: string) => `/community/${id}/edit`,
}

export default ROUTES;