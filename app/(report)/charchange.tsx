import CharCard from "@/components/report/charcard";
import Header from "@/components/ui/Header";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatChange() {
  const { characters } = useLocalSearchParams<{ characters: string }>();
  const parsedCharacters = characters ? JSON.parse(characters) : [];

  console.log(parsedCharacters);
  return (
    <SafeAreaView>
      <Header />
      {parsedCharacters.map((character: any) => (
        <CharCard key={character.characterId} character={character} />
      ))}
    </SafeAreaView>
  );
}
