interface Session {
    session: {
        user: string;
        expires: string
    };
    status: "authenticated" | "unauthenticated" | "loading";
}

export default Session