export const validateEmail=(email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
//regex is for regular expression
// 1. Local Part (before @):
// [^\s@]+: The local part (e.g., john.doe in john.doe@example.com) must:
// Contain at least 1 character.
// Not include spaces (\s) or @ symbols.
// 2. Domain Part (after @):
// [^\s@]+: The domain name (e.g., example in example.com) must:
// Contain at least 1 character.
// Not include spaces or @ symbols.
// \.: A literal dot (.), separating the domain name and top-level domain (e.g., .com).
// [^\s@]+$: The top-level domain (e.g., com) must:
// Contain at least 1 character.
// Not include spaces or @ symbols.