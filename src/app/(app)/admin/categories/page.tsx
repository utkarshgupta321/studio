
"use client";

import { useState, useCallback } from 'react';
import { AdminCategoryTable } from "@/components/admin/AdminCategoryTable";
import { AddCategoryDialog } from "@/components/admin/AddCategoryDialog";
import { EditCategoryDialog } from "@/components/admin/EditCategoryDialog";
import { mockCategories, mockThreads } from "@/lib/mock-data";
import type { ForumCategory, AddCategoryFormData, EditCategoryFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { defaultCategoryIconName } from '@/lib/icon-map';

export default function AdminCategoriesPage() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ForumCategory[]>([...mockCategories]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategoryToEdit, setCurrentCategoryToEdit] = useState<ForumCategory | null>(null);

  const refreshCategories = useCallback(() => {
    // Recalculate counts and last thread info for all categories
    const updatedMockCategories = mockCategories.map(cat => {
        const categoryThreads = mockThreads.filter(t => t.categoryId === cat.id);
        const sortedThreads = categoryThreads.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const lastThread = sortedThreads[0];

        return {
            ...cat,
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
    setCategories([...updatedMockCategories]); // Update state which re-renders AdminCategoryTable
  }, []);


  const handleOpenAddDialog = () => setIsAddDialogOpen(true);
  const handleCloseAddDialog = () => setIsAddDialogOpen(false);

  const handleAddCategory = (data: AddCategoryFormData) => {
    const newCategory: ForumCategory = {
      id: `category-${Date.now()}-${Math.random().toString(36).substring(7)}`, // More robust unique ID
      name: data.name,
      description: data.description,
      iconName: data.iconName || defaultCategoryIconName,
      threadsCount: 0,
      postsCount: 0,
      lastThread: undefined,
    };
    
    // Update mockCategories directly
    mockCategories.push(newCategory);
    refreshCategories(); // Refresh to update the list with the new category
    
    toast({ title: "Category Added", description: `Category "${newCategory.name}" has been successfully added.` });
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
      mockCategories[categoryIndex] = {
        ...mockCategories[categoryIndex],
        name: data.name,
        description: data.description,
        iconName: data.iconName || defaultCategoryIconName,
      };
      refreshCategories(); // Recalculate and update state for categories list
      toast({ title: "Category Updated", description: `Category "${originalName}" has been updated to "${data.name}".` });
    } else {
      toast({ title: "Update Failed", description: "Category not found for update.", variant: "destructive" });
    }
    handleCloseEditDialog();
  };

  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    // It's generally not a good idea to allow deletion of categories with threads/posts
    // without a clear strategy for handling those items (e.g., reassign or delete them).
    // For this mock, we'll check if there are threads.
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
        refreshCategories(); // Update the state
        toast({ title: "Category Deleted", description: `Category "${categoryName}" has been deleted.`, variant: "destructive" });
    } else {
        toast({ title: "Deletion Failed", description: "Category not found for deletion.", variant: "destructive" });
    }
  };

  // Initial load and refresh when mockThreads might change elsewhere (e.g., admin thread management)
  // This is a simplified approach for mock data. Real apps would rely on data fetching libraries.
  useState(() => {
    refreshCategories();
  });


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>
        <Button onClick={handleOpenAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>
      
      <AdminCategoryTable 
        categories={categories}
        onEditCategory={handleOpenEditDialog}
        onDeleteCategory={handleDeleteCategory}
      />

      <AddCategoryDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        onSave={handleAddCategory}
      />

      {currentCategoryToEdit && (
        <EditCategoryDialog
          category={currentCategoryToEdit}
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onSave={handleUpdateCategory}
        />
      )}
    </div>
  );
}
