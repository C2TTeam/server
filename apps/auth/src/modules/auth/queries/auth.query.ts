const query = (email : string) => {
    return `SELECT * FROM users WHERE email = '${email}'`;

}

export {query}