import React, { createContext, ReactNode, useContext, useState } from "react";

// 캐릭터별 미션 상태 타입
interface CharacterMissionState {
  missions: string[];
  mission1Done: boolean;
  mission2Done: boolean;
  mission3Done: boolean;
}

// 전체 미션 상태 타입 (캐릭터 ID를 키로 사용)
interface MissionState {
  characterMissions: { [characterId: number]: CharacterMissionState };
  currentCharacterId: number | null;
}

interface MissionContextType {
  state: MissionState;
  setCurrentCharacter: (characterId: number, missions: string[]) => void;
  setMission1Done: (done: boolean) => void;
  setMission2Done: (done: boolean) => void;
  setMission3Done: (done: boolean) => void;
  resetMissions: () => void;
  getCurrentMissions: () => CharacterMissionState | null;
}

const initialCharacterState: CharacterMissionState = {
  missions: [],
  mission1Done: false,
  mission2Done: false,
  mission3Done: false,
};

const initialState: MissionState = {
  characterMissions: {},
  currentCharacterId: null,
};

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MissionState>(initialState);

  // 현재 캐릭터 설정 및 미션 초기화
  const setCurrentCharacter = (characterId: number, missions: string[]) => {
    setState((prev) => {
      // 해당 캐릭터의 기존 미션 상태가 있으면 유지, 없으면 새로 생성
      const existingMissionState = prev.characterMissions[characterId];
      const newMissionState = existingMissionState
        ? { ...existingMissionState, missions }
        : { ...initialCharacterState, missions };

      return {
        ...prev,
        currentCharacterId: characterId,
        characterMissions: {
          ...prev.characterMissions,
          [characterId]: newMissionState,
        },
      };
    });
  };

  // 현재 캐릭터의 미션 상태 가져오기
  const getCurrentMissions = (): CharacterMissionState | null => {
    if (state.currentCharacterId === null) return null;
    return state.characterMissions[state.currentCharacterId] || null;
  };

  const setMission1Done = (done: boolean) => {
    setState((prev) => {
      if (prev.currentCharacterId === null) return prev;
      return {
        ...prev,
        characterMissions: {
          ...prev.characterMissions,
          [prev.currentCharacterId]: {
            ...prev.characterMissions[prev.currentCharacterId],
            mission1Done: done,
          },
        },
      };
    });
  };

  const setMission2Done = (done: boolean) => {
    setState((prev) => {
      if (prev.currentCharacterId === null) return prev;
      return {
        ...prev,
        characterMissions: {
          ...prev.characterMissions,
          [prev.currentCharacterId]: {
            ...prev.characterMissions[prev.currentCharacterId],
            mission2Done: done,
          },
        },
      };
    });
  };

  const setMission3Done = (done: boolean) => {
    setState((prev) => {
      if (prev.currentCharacterId === null) return prev;
      return {
        ...prev,
        characterMissions: {
          ...prev.characterMissions,
          [prev.currentCharacterId]: {
            ...prev.characterMissions[prev.currentCharacterId],
            mission3Done: done,
          },
        },
      };
    });
  };

  const resetMissions = () => {
    setState(initialState);
  };

  return (
    <MissionContext.Provider
      value={{
        state,
        setCurrentCharacter,
        setMission1Done,
        setMission2Done,
        setMission3Done,
        resetMissions,
        getCurrentMissions,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
}

export function useMission() {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error("useMission must be used within MissionProvider");
  }
  return context;
}
