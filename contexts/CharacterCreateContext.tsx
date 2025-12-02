// contexts/CharacterCreateContext.tsx

import React, { createContext, ReactNode, useContext, useState } from "react";

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
  
  // char_add3 데이터
  history: string;
  
  // char_add4 데이터
  uploadedFile: string | null;
}

interface CharacterCreateContextType {
  data: CharacterCreateData;
  updateData: (newData: Partial<CharacterCreateData>) => void;
  resetData: () => void;
  // 편집 모드 관련
  isEditMode: boolean;
  editCharacterId: number | null;
  setEditMode: (isEdit: boolean, characterId?: number) => void;
  initializeEditData: (characterData: Partial<CharacterCreateData>) => void;
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
  history: "",
  uploadedFile: null,
};

const CharacterCreateContext = createContext<CharacterCreateContextType | undefined>(undefined);

export function CharacterCreateProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CharacterCreateData>(initialData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCharacterId, setEditCharacterId] = useState<number | null>(null);

  const updateData = (newData: Partial<CharacterCreateData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const resetData = () => {
    setData(initialData);
    setIsEditMode(false);
    setEditCharacterId(null);
  };

  const setEditMode = (isEdit: boolean, characterId?: number) => {
    setIsEditMode(isEdit);
    setEditCharacterId(characterId || null);
  };

  const initializeEditData = (characterData: Partial<CharacterCreateData>) => {
    setData((prev) => ({ ...prev, ...characterData }));
  };

  return (
    <CharacterCreateContext.Provider value={{ 
      data, 
      updateData, 
      resetData,
      isEditMode,
      editCharacterId,
      setEditMode,
      initializeEditData,
    }}>
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

