import React, { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"

type SearchInputProps = {
  defaultValue: string
  onChangeText: (text: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  defaultValue,
  onChangeText,
}) => {
  const [searchKey, setSearchKey] = useState<string>(defaultValue)

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type here to search"
        onChangeText={setSearchKey}
        defaultValue={searchKey}
        value={searchKey}
        onSubmitEditing={() => onChangeText(searchKey)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    paddingTop: 5,
    borderRadius: 20,
  },
  input: {
    paddingHorizontal: 20,
    height: 50,
  },
})

export default SearchInput
