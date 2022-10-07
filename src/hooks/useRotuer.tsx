export const useRouter = () => {
  const push = (path: string) => {
    history.pushState(undefined, "", path);
    const popStateEvent = new PopStateEvent("popstate", { state: path });
    dispatchEvent(popStateEvent);
  };

  return { push };
};
