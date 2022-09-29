export const initials = (name = "") => {
    const nameParts = name.split(" ");
    return nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[1][0]}` : "";
};