import { useState } from "react";

export const useConfirmationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const openDialog = (data) => {
    setDialogData(data);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialogData(null);
  };

  return {
    isOpen,
    dialogData,
    openDialog,
    closeDialog,
  };
};
