"use client";
import { Button } from "@/components/ui/base-button";
import { Input, InputWrapper } from "@/components/ui/base-input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { CheckIcon } from "lucide-react";
import { useRef } from "react";

export function OfferCode() {
  const { copy, copied } = useCopyToClipboard();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      copy(inputRef.current.value);
    }
  };

  return (
    <div className="w-70">
      <InputWrapper
        variant={"lg"}
        className="bg-transparent py-2 h-16 border-b-accent"
      >
        <Input
          type="email"
          placeholder="Copy to clipboard"
          defaultValue="X120120"
          ref={inputRef}
          readOnly
          className={`h-43 font-black text-2xl text-center read-only:!bg-transparent !font-mono !text-red-600`}
        />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleCopy}
                variant="foreground"
                disabled={copied}
                className="-me-3.5 w-14 h-full bg-amber-200"
              >
                {copied ? (
                  <CheckIcon className="stroke-green-600" size={50} />
                ) : (
                  <>کپی کردن</>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              کپی کردن کد
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </InputWrapper>
    </div>
  );
}
