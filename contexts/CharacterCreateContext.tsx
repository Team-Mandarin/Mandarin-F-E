// contexts/CharacterCreateContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

// 캐릭터 생성 데이터 타입
interface CharacterCreateData {
  // char_add1 데이터
  characterImage: string | null;
  name: string;
  age: string | null;
  relationshipType: "SUM" | "LOVE" | "BREAKUP" | null;
  dateMet: Date | null;
  
  // char_add2 데이터 (상대방 연애 타입 질문 답변)
  loveTypeAnswers: { [key: number]: number | null };
}

interface CharacterCreateContextType {
  data: CharacterCreateData;
  updateData: (newData: Partial<CharacterCreateData>) => void;
  resetData: () => void;
}

const initialData: CharacterCreateData = {
  characterImage: null,
  name: "",
  age: null,
  relationshipType: null,
  dateMet: null,
  loveTypeAnswers: {
    1: null,
    5: null,
    2: null,
    10: null,
  },
};

const CharacterCreateContext = createContext<CharacterCreateContextType | undefined>(undefined);

export function CharacterCreateProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CharacterCreateData>(initialData);

  const updateData = (newData: Partial<CharacterCreateData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const resetData = () => {
    setData(initialData);
  };

  return (
    <CharacterCreateContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </CharacterCreateContext.Provider>
  );
}

export function useCharacterCreate() {
  const context = useContext(CharacterCreateContext);
  if (!context) {
    throw new Error("useCharacterCreate must be used within CharacterCreateProvider");
  }
  return context;
}

