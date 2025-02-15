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
    CREATE_EVENT: (id: string) => `/community/${id}/create-event`,
    EVENT: (id: string) => `/community/${id}/event`,
    EVENT_ID: (communityId: string, eventId: string) => `/community/${communityId}/event/${eventId}`,
    EDITUSER: (id: string) => `/profile/${id}/edit`,
}

export default ROUTES;