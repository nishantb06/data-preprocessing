import { TextareaWithButton } from "@/components/tokenization";

export default function SynonymsPage() {
  return (
    <div className="container py-8">
      <TextareaWithButton 
        placeholder="Enter text to find synonyms..."
        buttonText="Find Synonyms"
        className="min-h-[250px]"
      />
      <TextareaWithButton 
        placeholder="Tokenized text..."
        buttonText="Clear"
        className="min-h-[250px]"
      />
    </div>
  )
}
