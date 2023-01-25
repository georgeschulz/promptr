export const endpoint = 
    process.env.NODE_ENV === "production"
        ? "https://copyprompts.herokuapp.com"
        : "http://localhost:4001";