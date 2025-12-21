import Juice0 from "@/assets/svg/juice/0.svg";
import Juice25 from "@/assets/svg/juice/25.svg";
import Juice50 from "@/assets/svg/juice/50.svg";
import Juice75 from "@/assets/svg/juice/75.svg";
import { useCharId } from "@/contexts/CharIdContext";
import { authService } from "@/services/authService";
import { chatService } from "@/services/chatService";
import { reportService } from "@/services/reportService";
import { Character, Simulation, chatReport } from "@/types/api";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import MandarinText from "../ui/MandarinText";
import CharacterCard from "./charactercard";
import ReportCard from "./reportcard";

const JUICE_HEIGHT = 120;

interface CharacterCustom {
  characterId: number;
  characterName: string;
  characterImg: string | undefined;
}

export default function JuiceDetailPage() {
  const [juiceName, setJuiceName] = useState("");
  const [juiceImage, setJuiceImage] = useState<React.ReactNode>(
    <Juice75 height={JUICE_HEIGHT} />
  );
  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterCustom, setCharacterCustom] = useState<CharacterCustom[]>([]);
  const { charId } = useCharId();
  const [chatList, setChatList] = useState<Simulation[]>([]);
  const [chatListCustom, setChatListCustom] = useState<Simulation[]>([]);
  const [reports, setReports] = useState<chatReport[]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    const getCharacters = async () => {
      const id = await authService.getId();
      const response = await chatService.getCharacters(Number(id));

      setCharacters(response.data ?? []);
    };
    getCharacters();
  }, []);

  useEffect(() => {
    const characterCustom = characters.map((character) => {
      return {
        characterId: character.characterId,
        characterName: character.characterName,
        characterImg: character.characterImg,
      };
    });

    setCharacterCustom(characterCustom);
  }, [characters]);

  useEffect(() => {
    const getChatList = async () => {
      if (charId !== 0) {
        const response = await chatService.getChatList(charId);
        setChatList(response.data ?? []);
      }
    };
    getChatList();
  }, [charId]);

  useEffect(() => {
    const finishedChats = chatList.filter((chat) => chat.isFinished === true);
    setChatListCustom(finishedChats);
  }, [chatList]);

  useEffect(() => {
    const getReports = async () => {
      const response = await reportService.getChatReports();
      setReports(response.data ?? []);
    };
    getReports();
  }, []);

  useEffect(() => {
    // 현재 선택된 charId에 해당하는 리포트들만 필터링하고 scoreAvg 평균 계산
    const filteredReports = reports.filter(
      (report) => report.characterId === charId
    );
    if (filteredReports.length === 0) {
      setTotalScore(0);
      return;
    }
    const sum = filteredReports.reduce(
      (acc, report) => acc + (report.scoreAvg || 0),
      0
    );
    const average = sum / filteredReports.length;
    setTotalScore(average);
  }, [reports, charId]);

  useEffect(() => {
    if (totalScore >= 75) {
      setJuiceName("감귤 착즙 주스");
      setJuiceImage(<Juice75 height={JUICE_HEIGHT} />);
    } else if (totalScore >= 50) {
      setJuiceName("감귤맛 주스");
      setJuiceImage(<Juice50 height={JUICE_HEIGHT} />);
    } else if (totalScore >= 25) {
      setJuiceName("감귤향 주스");
      setJuiceImage(<Juice25 height={JUICE_HEIGHT} />);
    } else {
      setJuiceName("감귤 껍질 주스");
      setJuiceImage(<Juice0 height={JUICE_HEIGHT} />);
    }
  }, [totalScore]);

  return (
    <View className="flex-1 bg-white items-center">
      <CharacterCard characters={characterCustom} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center mt-12">{juiceImage}</View>
        <MandarinText className="text-lg font-medium text-center mt-4">
          {juiceName}
        </MandarinText>
        <MandarinText className="text-[#8E8E8E] text-sm font-medium text-center mt-4">
          건강한 채팅이 쌓일수록 감귤 주스의 농도가 올라가요.
        </MandarinText>
        {chatListCustom.map((chat) => (
          <ReportCard
            key={chat.simulationId}
            simulationId={chat.simulationId}
            simulationName={chat.simulationName}
            purpose={chat.purpose}
            category={chat.category}
            time={chat.time}
          />
        ))}
      </ScrollView>
    </View>
  );
}
