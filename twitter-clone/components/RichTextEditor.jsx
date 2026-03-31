import React, { useRef } from "react"
import { useColorScheme, StyleSheet } from "react-native"
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor"
import ThemedView from "./ThemedView"
import { Theme } from "../constants/Theme"

export default function Editor({ onChange }) {
    const richText = useRef(); 
    const colorScheme = useColorScheme()
    const theme = Theme[colorScheme] ?? Theme.dark

    // ⚡ This function removes the <div> and <p> tags
    const handleChange = (html) => {
        // This regex removes all HTML tags
        const cleanText = html.replace(/<[^>]*>?/gm, '');
        
        // Send the clean text back to your home/state
        onChange(cleanText);
    }

    return (
        <ThemedView style={{ flex: 1 }}>
            <RichEditor
                ref={richText}
                placeholder="Write something..."
                // Use the new handleChange function here
                onChange={handleChange} 
                style={[styles.richEditor, { 
                    backgroundColor: theme.background,
                    borderColor: theme.iconColor 
                }]}
                editorStyle={{
                    backgroundColor: theme.background,
                    color: theme.text,
                }}
            />

            <RichToolbar
                editor={richText}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                ]}
                iconTint={theme.text}
                selectedIconTint={Theme.primary}
                style={[styles.richToolbar, { 
                    backgroundColor: theme.background, 
                    borderColor: theme.iconColor 
                }]}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    richEditor: {
        minHeight: 200,
        borderWidth: 0.6,
        borderBottomWidth: 0,
        borderTopLeftRadius: Theme.radius.xl,
        borderTopRightRadius: Theme.radius.xl,
    },
    richToolbar: {
        borderWidth: 0.6,
        borderBottomEndRadius: Theme.radius.xl,
        borderBottomStartRadius: Theme.radius.xl,
        marginBottom: 20, 
    }
})