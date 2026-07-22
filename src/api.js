export async function fetchSampleUsers() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const users = await res.json();
        return users.map(({ id, name, email }) => ({ id, name, email }));
    } catch (err) {
        console.error("Error fetching users:", err);
        return [];
    } finally {
        console.log("Fetch attempt completed.");
    }
};

export function fetchSampleUsersPromise() {
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            return [];
        })
}