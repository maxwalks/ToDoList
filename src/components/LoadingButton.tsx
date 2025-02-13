import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function LoadingButton () {
  return (
    <Button
      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
      disabled={true}
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait...
    </Button>
  );
}