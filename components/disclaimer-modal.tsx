"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface DisclaimerModalProps {
  isOpen: boolean;
  onContinue: () => void;
}

export function DisclaimerModal({ isOpen, onContinue }: DisclaimerModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleContinue = () => {
    setOpen(false);
    onContinue();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-grey-primary">
            Disclaimer!
          </DialogTitle>
          <DialogDescription className="text-sm text-grey-secondary leading-relaxed ">
            This app is still in development. I am in the process of acquiring the proper licenses to display official Bible translations. Currently, the text is provided through an online API, which may contain bugs or display errors I am already aware of. Updates will be made as improvements and licensing are finalized.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-2">
          <Button 
            onClick={handleContinue}
            className="px-8 py-2 bg-grey-primary text-bold text-white font-medium"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
