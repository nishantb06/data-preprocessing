import { Button } from "./ui/button"
import { Textarea } from "./ui/text-area"
import { TextareaHTMLAttributes, useState } from "react"

interface TextareaWithButtonProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSubmit?: (text: string) => void;
  buttonText?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export function TextareaWithButton({ 
  onSubmit, 
  buttonText = "Send message",
  value,
  onChange,
  readOnly = false,
  ...textareaProps 
}: TextareaWithButtonProps) {
  const handleSubmit = () => {
    if (onSubmit && value) {
      onSubmit(value);
    }
  };

  return (
    <div className="grid w-full max-w-3xl gap-2">
      <Textarea 
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        {...textareaProps}
      />
      <Button onClick={handleSubmit}>{buttonText}</Button>
    </div>
  )
}
