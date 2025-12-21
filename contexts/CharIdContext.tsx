import React, { createContext, ReactNode, useContext, useState } from "react";

interface CharIdContextType {
  charId: number;
  setCharId: (charId: number) => void;
}

const CharIdContext = createContext<CharIdContextType | undefined>(undefined);

export function CharIdProvider({ children }: { children: ReactNode }) {
  const [charId, setCharId] = useState<number>(0);

  return (
    <CharIdContext.Provider
      value={{
        charId,
        setCharId,
      }}
    >
      {children}
    </CharIdContext.Provider>
  );
}

export function useCharId() {
  const context = useContext(CharIdContext);
  if (!context) {
    throw new Error("useCharId must be used within CharIdProvider");
  }
  return context;
}
