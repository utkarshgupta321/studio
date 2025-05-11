
"use client";

import { useState, useCallback } from 'react';
import { AdminServerTable } from "@/components/admin/AdminServerTable";
import { AddServerDialog } from "@/components/admin/AddServerDialog";
// import { EditServerDialog } from "@/components/admin/EditServerDialog"; // For future use
import { mockServers, mockCategories } from "@/lib/mock-data";
import type { Server, AddServerFormData, EditServerFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle, ServerIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminServersPage() {
  const { toast } = useToast();
  const [servers, setServers] = useState<Server[]>([...mockServers]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // For future use
  // const [currentServerToEdit, setCurrentServerToEdit] = useState<Server | null>(null); // For future use

  const refreshServers = useCallback(() => {
    setServers([...mockServers]);
  }, []);

  const handleOpenAddDialog = () => setIsAddDialogOpen(true);
  const handleCloseAddDialog = () => setIsAddDialogOpen(false);

  const handleAddServer = (data: AddServerFormData) => {
    const newServer: Server = {
      id: `server-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      name: data.name,
      description: data.description,
    };
    mockServers.push(newServer);
    refreshServers();
    toast({ title: "Server Added", description: `Server "${newServer.name}" has been successfully added.` });
    handleCloseAddDialog();
  };

  // const handleOpenEditDialog = (server: Server) => { // For future use
  //   setCurrentServerToEdit(server);
  //   setIsEditDialogOpen(true);
  // };
  // const handleCloseEditDialog = () => { // For future use
  //   setCurrentServerToEdit(null);
  //   setIsEditDialogOpen(false);
  // };

  // const handleUpdateServer = (data: EditServerFormData) => { // For future use
  //   const serverIndex = mockServers.findIndex(s => s.id === data.id);
  //   if (serverIndex !== -1) {
  //     const originalName = mockServers[serverIndex].name;
  //     mockServers[serverIndex] = { ...mockServers[serverIndex], ...data };
  //     refreshServers();
  //     toast({ title: "Server Updated", description: `Server "${originalName}" has been updated to "${data.name}".` });
  //   } else {
  //     toast({ title: "Update Failed", description: "Server not found for update.", variant: "destructive" });
  //   }
  //   handleCloseEditDialog();
  // };

  const handleDeleteServer = (serverId: string, serverName: string) => {
    const categoriesInServer = mockCategories.filter(cat => cat.serverId === serverId).length;
    if (categoriesInServer > 0) {
        toast({
            title: "Deletion Blocked",
            description: `Server "${serverName}" cannot be deleted because it contains ${categoriesInServer} categorie(s). Please move or delete categories first.`,
            variant: "destructive",
            duration: 7000,
        });
        return;
    }

    const serverIndex = mockServers.findIndex(s => s.id === serverId);
    if (serverIndex !== -1) {
        mockServers.splice(serverIndex, 1);
        refreshServers();
        toast({ title: "Server Deleted", description: `Server "${serverName}" has been deleted.`, variant: "destructive" });
    } else {
        toast({ title: "Deletion Failed", description: "Server not found for deletion.", variant: "destructive" });
    }
  };

  useState(() => {
    refreshServers();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <ServerIcon className="mr-3 h-8 w-8 text-primary" /> Server Management
        </h1>
        <Button onClick={handleOpenAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Server
        </Button>
      </div>
      
      <AdminServerTable 
        servers={servers}
        // onEditServer={handleOpenEditDialog} // For future use
        onDeleteServer={handleDeleteServer}
      />

      <AddServerDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        onSave={handleAddServer}
      />

      {/* {currentServerToEdit && ( // For future use
        <EditServerDialog
          server={currentServerToEdit}
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onSave={handleUpdateServer}
        />
      )} */}
    </div>
  );
}
