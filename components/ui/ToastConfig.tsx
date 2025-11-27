import { BaseToast, ToastConfig } from "react-native-toast-message";

const FONT_SIZE_TEXT1 = 14;
const FONT_SIZE_TEXT2 = 14;

export const toastConfig: ToastConfig = {
  login: ({ text1, text2, props }) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#484845",
        backgroundColor: "#484845",
        borderRadius: 30,
        width: 224,
        height: 50,
        marginBottom: 130,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        justifyContent: "center",
      }}
      text1Style={{
        fontSize: FONT_SIZE_TEXT1,
        color: "#EDEDED",
        fontWeight: "none",
        textAlign: "center",
      }}
      text2Style={{
        fontSize: FONT_SIZE_TEXT2,
        color: "#EDEDED",
        textAlign: "center",
      }}
      text1={text1}
      text2={text2}
    />
  ),
};
