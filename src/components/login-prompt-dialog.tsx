import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function LoginPromptDialog({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const navigate = useNavigate();
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);

  const showOpen = isControlled ? open : internalOpen;
  const setShowOpen = isControlled ? onOpenChange! : setInternalOpen;

  const handleLogin = () => {
    setShowOpen(false);
    navigate({ to: "/login" });
  };

  return (
    <Dialog open={showOpen} onOpenChange={setShowOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>
            Please log in first to save trails and access your saved items across devices.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleLogin}>Log in</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
