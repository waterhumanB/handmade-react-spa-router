import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface RouterProps {
  children: ReactNode;
}

export const RouterContext = createContext({
  path: window.location.pathname,
  setPath: (() => null) as Dispatch<SetStateAction<string>>,
});

export const Router = ({ children }: RouterProps) => {
  const [path, setPath] = useState(window.location.pathname);

  return (
    <RouterContext.Provider value={{ path, setPath }}>
      <section>{children}</section>
    </RouterContext.Provider>
  );
};
