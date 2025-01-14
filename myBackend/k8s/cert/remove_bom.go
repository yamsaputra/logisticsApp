package main

import (
	"bytes"
	"fmt"
	"os"
)

func main() {
	// Read the JSON file
	filePath := "server-csr.json"
	content, err := os.ReadFile(filePath)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	// Remove BOM if present
	content = bytes.TrimPrefix(content, []byte("\xef\xbb\xbf"))

	// Write the cleaned content back to the file
	err = os.WriteFile(filePath, content, 0644)
	if err != nil {
		fmt.Println("Error writing file:", err)
		return
	}

	fmt.Println("BOM removed successfully from", filePath)
}
