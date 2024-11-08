import { Button } from "./ui/button"
import { Textarea } from "./ui/text-area"

export function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}