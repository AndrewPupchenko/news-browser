import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC } from "react"
import WebView from "react-native-webview"
import { RootStackParamList } from "../../App"
import { ActivityIndicator } from "react-native"

export const DetailsScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Details">
> = ({ route }) => {
  return (
    <WebView
      renderLoading={() => <ActivityIndicator />}
      startInLoadingState={true}
      source={{ uri: route.params.url }}
      style={{ flex: 1 }}
    />
  )
}
