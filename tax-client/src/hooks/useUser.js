import { useState, useEffect } from "react";
import { getUser } from "../store/users/usersSelectors";

function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching current user: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading };
}

export default useUser;
