import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  const DeleteModal = ({ onClose }: { onClose: () => void }) => {
    const handleDelete = () => {
      
      onClose();
    };
  
    return (
      <Dialog open modal onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete To Do</DialogTitle>
            <DialogDescription>Are you sure you want to delete this task?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            <Button onClick={onClose} variant="secondary">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DeleteModal;
  