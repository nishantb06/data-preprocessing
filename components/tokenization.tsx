import { Button } from "./ui/button"
import { Textarea } from "./ui/text-area"
import { TextareaHTMLAttributes } from "react"

interface TextareaWithButtonProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSubmit?: () => void;
  buttonText?: string;
}

export function TextareaWithButton({ 
  onSubmit, 
  buttonText = "Send message",
  ...textareaProps 
}: TextareaWithButtonProps) {
  return (
    <div className="grid w-full max-w-3xl gap-2">
      <Textarea 
        placeholder="Type your message here." 
        {...textareaProps}
      />
      <Button onClick={onSubmit}>{buttonText}</Button>
    </div>
  )
}
