const ROUTES = {
    ROOT: "/",
    HOME: "/home",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    CREATE_COMMUNITY: "/create-community",
    PROFILE: (id: string) => `/profile/${id}`,
}

export default ROUTES;