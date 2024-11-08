'use client';
import { TextareaWithButton } from "@/components/tokenization";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const SAMPLE_TEXT = "777 Charlie was announced in September 2017. Principal photography took place from June 2018 to October 2021, with delays due to COVID-19 pandemic. The film was shot in various locations across Maharashtra,. 777 Charlie had a limited theatrical release on 2 June 2022, and released in cinemas worldwide on 10 June 2022. The film received critical acclaim for its cast performances (particularly Rakshit Shetty and Charlie), writing, emotional weight and direction. With theatrical earnings of over ₹105 crore (US$13 million) globally,[5] 777 Charlie became the fifth highest-grossing Kannada film at the time of release. At the 69th National Film Awards, the film won the award for Best Feature Film In Kannada.";

interface Replacements {
  [key: string]: string;
}

export default function SynonymsPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [replacements, setReplacements] = useState<Replacements>({});

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
      setOutputText(data.text);
      setReplacements(data.replacements);
    } catch (error) {
      console.error('Error fetching synonyms:', error);
      setOutputText('Error fetching synonyms. Please try again.');
      setReplacements({});
    }
  };

  const handleClear = () => {
    setOutputText("");
    setReplacements({});
  };

  const loadSampleText = () => {
    setInputText(SAMPLE_TEXT);
  };

  const renderReplacements = () => {
    if (Object.keys(replacements).length === 0) return null;

    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="font-semibold mb-2">Word Replacements:</h3>
        <ul className="space-y-1">
          {Object.entries(replacements).map(([original, replacement], index) => (
            <li key={index}>
              <span className="text-red-500 line-through">{original}</span>
              {' → '}
              <span className="text-green-500">{replacement}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container py-8 mx-auto max-w-5xl justify-center">
      <div className="mb-4">
        <Button onClick={loadSampleText} variant="outline">
          Load Sample Text
        </Button>
      </div>
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
        {renderReplacements()}
      </div>
    </div>
  )
}
