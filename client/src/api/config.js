export const endpoint = 
    process.env.NODE_ENV === "production"
        ? "https://promptr.herokuapp.com"
        : "http://localhost:4001";