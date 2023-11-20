import { useEffect, useState } from "react";

const useAuthHeaders = () => {
  const [headers, setHeaders] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setHeaders({
        Authorization: `Bearer ${accessToken}`,
      
      });
    }
  }, []);

  return headers;
};

export default useAuthHeaders;
