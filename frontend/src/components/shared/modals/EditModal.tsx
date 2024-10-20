import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Label, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
  import { ToDo } from "@/interfaces/ToDo";
  
  const EditModal = ({ todo, onClose }: { todo: ToDo, onClose: () => void }) => {
    const handleSave = () => {
      onClose();
    };
  
    return (
      <Dialog open modal onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit To Do</DialogTitle>
            <DialogDescription>Edit the details of the task.</DialogDescription>
          </DialogHeader>
          <Label>Task Name</Label>
          <Input className="mb-4" defaultValue={todo.text} />
          <Label>Priority</Label>
          <Select defaultValue={todo.priority}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button onClick={handleSave}>Save Changes</Button>
            <Button onClick={onClose} variant="secondary">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default EditModal;
  