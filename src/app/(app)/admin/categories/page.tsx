
"use client";

import { useState, useCallback, useEffect } from 'react'; // Added useEffect
import { AdminCategoryTable } from "@/components/admin/AdminCategoryTable";
import { AddCategoryDialog } from "@/components/admin/AddCategoryDialog";
import { EditCategoryDialog } from "@/components/admin/EditCategoryDialog";
import { mockCategories, mockThreads, mockServers } from "@/lib/mock-data"; // Added mockServers
import type { ForumCategory, AddCategoryFormData, EditCategoryFormData, Server } from "@/lib/types"; // Added Server
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { defaultCategoryIconName } from '@/lib/icon-map';

export default function AdminCategoriesPage() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [servers, setServers] = useState<Server[]>([...mockServers]); // State for servers
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategoryToEdit, setCurrentCategoryToEdit] = useState<ForumCategory | null>(null);

  const refreshCategories = useCallback(() => {
    const updatedMockCategories = mockCategories.map(cat => {
        const categoryThreads = mockThreads.filter(t => t.categoryId === cat.id);
        const sortedThreads = categoryThreads.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const lastThread = sortedThreads[0];
        const server = mockServers.find(s => s.id === cat.serverId);

        return {
            ...cat,
            serverName: server?.name || 'N/A', // Add server name
            threadsCount: categoryThreads.length,
            postsCount: categoryThreads.reduce((sum, t) => sum + t.posts.length, 0),
            lastThread: lastThread 
                ? { 
                    id: lastThread.id, 
                    title: lastThread.title, 
                    authorName: lastThread.author.username, 
                    timestamp: lastThread.lastReplyAt || lastThread.createdAt
                  } 
                : undefined,
        };
    });
    setCategories([...updatedMockCategories]);
  }, []);

  useEffect(() => {
    refreshCategories();
    setServers([...mockServers]); // Ensure servers are also up-to-date for dialogs
  }, [refreshCategories]);


  const handleOpenAddDialog = () => setIsAddDialogOpen(true);
  const handleCloseAddDialog = () => setIsAddDialogOpen(false);

  const handleAddCategory = (data: AddCategoryFormData) => {
    const server = mockServers.find(s => s.id === data.serverId);
    const newCategory: ForumCategory = {
      id: `category-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      name: data.name,
      description: data.description,
      iconName: data.iconName || defaultCategoryIconName,
      serverId: data.serverId,
      serverName: server?.name || 'N/A',
      threadsCount: 0,
      postsCount: 0,
      lastThread: undefined,
    };
    
    mockCategories.push(newCategory);
    refreshCategories(); 
    
    toast({ title: "Category Added", description: `Category "${newCategory.name}" has been successfully added to server "${server?.name}".` });
    handleCloseAddDialog();
  };

  const handleOpenEditDialog = (category: ForumCategory) => {
    setCurrentCategoryToEdit(category);
    setIsEditDialogOpen(true);
  };
  const handleCloseEditDialog = () => {
    setCurrentCategoryToEdit(null);
    setIsEditDialogOpen(false);
  };

  const handleUpdateCategory = (data: EditCategoryFormData) => {
    const categoryIndex = mockCategories.findIndex(c => c.id === data.id);
    if (categoryIndex !== -1) {
      const originalName = mockCategories[categoryIndex].name;
      const server = mockServers.find(s => s.id === data.serverId);
      mockCategories[categoryIndex] = {
        ...mockCategories[categoryIndex],
        name: data.name,
        description: data.description,
        iconName: data.iconName || defaultCategoryIconName,
        serverId: data.serverId,
        serverName: server?.name || 'N/A',
      };
      refreshCategories();
      toast({ title: "Category Updated", description: `Category "${originalName}" has been updated to "${data.name}" on server "${server?.name}".` });
    } else {
      toast({ title: "Update Failed", description: "Category not found for update.", variant: "destructive" });
    }
    handleCloseEditDialog();
  };

  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    const threadsInCategory = mockThreads.filter(thread => thread.categoryId === categoryId).length;
    if (threadsInCategory > 0) {
        toast({
            title: "Deletion Blocked",
            description: `Category "${categoryName}" cannot be deleted because it contains ${threadsInCategory} thread(s). Please move or delete threads first.`,
            variant: "destructive",
            duration: 5000,
        });
        return;
    }

    const categoryIndex = mockCategories.findIndex(c => c.id === categoryId);
    if (categoryIndex !== -1) {
        mockCategories.splice(categoryIndex, 1);
        refreshCategories(); 
        toast({ title: "Category Deleted", description: `Category "${categoryName}" has been deleted.`, variant: "destructive" });
    } else {
        toast({ title: "Deletion Failed", description: "Category not found for deletion.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <LayoutList className="mr-3 h-8 w-8 text-primary" /> Category Management
        </h1>
        <Button onClick={handleOpenAddDialog} disabled={servers.length === 0}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>
      {servers.length === 0 && (
        <p className="text-center text-muted-foreground">
            Please add a server first before adding categories.
        </p>
      )}
      
      <AdminCategoryTable 
        categories={categories}
        onEditCategory={handleOpenEditDialog}
        onDeleteCategory={handleDeleteCategory}
      />

      {isAddDialogOpen && servers.length > 0 && (
        <AddCategoryDialog
          isOpen={isAddDialogOpen}
          onClose={handleCloseAddDialog}
          onSave={handleAddCategory}
          servers={servers}
        />
      )}

      {currentCategoryToEdit && isEditDialogOpen && servers.length > 0 && (
        <EditCategoryDialog
          category={currentCategoryToEdit}
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onSave={handleUpdateCategory}
          servers={servers}
        />
      )}
    </div>
  );
}
