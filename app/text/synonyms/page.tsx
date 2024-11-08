'use client';
import { TextareaWithButton } from "@/components/tokenization";
import { useState } from "react";

export default function SynonymsPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleFindSynonyms = async (text: string) => {
    try {
      const response = await fetch('http://localhost:8085/synonyms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setOutputText(data.result);
    } catch (error) {
      console.error('Error fetching synonyms:', error);
      setOutputText('Error fetching synonyms. Please try again.');
    }
  };

  const handleClear = () => {
    setOutputText("");
  };

  return (
    <div className="container py-8 mx-auto max-w-5xl justify-center">
      <TextareaWithButton 
        placeholder="Enter text to find synonyms..."
        buttonText="Find Synonyms"
        className="min-h-[250px]"
        value={inputText}
        onChange={setInputText}
        onSubmit={handleFindSynonyms}
      />
      <div className="mt-8">
        <TextareaWithButton 
          placeholder="Tokenized text..."
          buttonText="Clear"
          className="min-h-[250px]"
          value={outputText}
          onChange={setOutputText}
          onSubmit={handleClear}
          readOnly
        />
      </div>
    </div>
  )
}
