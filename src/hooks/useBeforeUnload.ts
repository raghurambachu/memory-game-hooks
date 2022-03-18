import { useCallback, useEffect } from "react";

export const useBeforeUnload = (message: string) => {
  const beforeunloadHandler = useCallback(
    (e: BeforeUnloadEvent) => {
      e.preventDefault();
      if (message) e.returnValue = message;
    },
    [message]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", beforeunloadHandler);
  }, [message, beforeunloadHandler]);
};
