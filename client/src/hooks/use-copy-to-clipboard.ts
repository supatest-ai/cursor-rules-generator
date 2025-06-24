import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useCopyToClipboard() {
  const [isCopying, setIsCopying] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, successMessage?: string) => {
    if (isCopying) return;

    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: successMessage || "Content has been copied to your clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      });
    } finally {
      setIsCopying(false);
    }
  };

  return { copyToClipboard, isCopying };
}
