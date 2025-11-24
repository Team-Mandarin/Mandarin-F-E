import { useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
import Dot from "./dot";
import Main0 from "./main0";
import Main1 from "./main1";
import Main2 from "./main2";
import Main3 from "./main3";
import Main4 from "./main4";

export default function Main() {
  const [page, setPage] = useState(0);

  return (
    <View className="flex-1 relative bg-white">
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        <View key="1">
          <Main0 />
        </View>
        <View key="2">
          <Main1 />
        </View>
        <View key="3">
          <Main2 />
        </View>
        <View key="4">
          <Main3 />
        </View>
        <View key="5">
          <Main4 />
        </View>
      </PagerView>

      <Dot page={page} />
    </View>
  );
}
