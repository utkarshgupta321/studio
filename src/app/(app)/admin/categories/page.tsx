
"use client";

import { useState, useEffect, useCallback } from 'react';
import { mockCategories, mockThreads } from "@/lib/mock-data";
import type { ForumCategory, AddCategoryFormData, EditCategoryFormData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AdminCategoryTable } from "@/components/admin/AdminCategoryTable";
import { AddCategoryDialog } from "@/components/admin/AddCategoryDialog";
import { EditCategoryDialog } from "@/components/admin/EditCategoryDialog";
import { getLucideIcon, defaultCategoryIconName } from '@/lib/icon-map';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


export default function AdminCategoriesPage() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ForumCategory[]>([...mockCategories]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ForumCategory | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string } | null>(null);

  // Recalculate counts for display
  const refreshCategoriesWithCounts = useCallback(() => {
    const updatedCategories = mockCategories.map(cat => ({
      ...cat,
      threadsCount: mockThreads.filter(t => t.categoryId === cat.id).length,
      postsCount: mockThreads.filter(t => t.categoryId === cat.id).reduce((sum, t) => sum + t.posts.length, 0),
    }));
    setCategories(updatedCategories);
  }, []);

  useEffect(() => {
    refreshCategoriesWithCounts();
  }, [refreshCategoriesWithCounts]);


  const handleAddCategory = (data: AddCategoryFormData) => {
    const newCategoryId = `category-${Date.now()}`; // Simple ID generation
    const newCategory: ForumCategory = {
      id: newCategoryId,
      name: data.name,
      description: data.description,
      iconName: data.iconName || defaultCategoryIconName,
      icon: getLucideIcon(data.iconName || defaultCategoryIconName),
      threadsCount: 0,
      postsCount: 0,
      // lastThread will be updated dynamically if threads are added
    };
    mockCategories.push(newCategory); // Mutate mock data
    refreshCategoriesWithCounts();
    toast({ title: "Category Added", description: `Category "${newCategory.name}" has been created.` });
    setIsAddDialogOpen(false);
  };

  const handleOpenEditDialog = (category: ForumCategory) => {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleEditCategory = (data: EditCategoryFormData) => {
    const categoryIndex = mockCategories.findIndex(c => c.id === data.id);
    if (categoryIndex !== -1) {
      const updatedCategory = {
        ...mockCategories[categoryIndex],
        name: data.name,
        description: data.description,
        iconName: data.iconName || defaultCategoryIconName,
        icon: getLucideIcon(data.iconName || defaultCategoryIconName),
      };
      mockCategories[categoryIndex] = updatedCategory;
      refreshCategoriesWithCounts();
      toast({ title: "Category Updated", description: `Category "${updatedCategory.name}" has been updated.` });
    } else {
      toast({ title: "Error", description: "Failed to update category.", variant: "destructive" });
    }
    setIsEditDialogOpen(false);
    setEditingCategory(null);
  };
  
  const handleOpenDeleteDialog = (categoryId: string, categoryName: string) => {
    setCategoryToDelete({ id: categoryId, name: categoryName });
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCategory = () => {
    if (!categoryToDelete) return;

    const categoryIndex = mockCategories.findIndex(c => c.id === categoryToDelete.id);
    if (categoryIndex !== -1) {
      // Check if category has threads. For this demo, we'll allow deleting even if it has threads.
      // In a real app, you might want to prevent this or reassign threads.
      const threadsInCategory = mockThreads.filter(t => t.categoryId === categoryToDelete.id).length;
      if (threadsInCategory > 0) {
        // Optionally, inform the admin or prevent deletion.
        // For now, we proceed with deletion.
        // You might want to also delete/reassign threads here.
        // For this example, we will filter out threads belonging to the deleted category.
        // This is a destructive action and should be handled carefully in a real app.
        // mockThreads = mockThreads.filter(t => t.categoryId !== categoryToDelete.id);
      }

      mockCategories.splice(categoryIndex, 1);
      refreshCategoriesWithCounts();
      toast({ title: "Category Deleted", description: `Category "${categoryToDelete.name}" has been deleted.`, variant: "destructive" });
    } else {
      toast({ title: "Error", description: "Failed to delete category.", variant: "destructive" });
    }
    setIsDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>
      
      <AdminCategoryTable 
        categories={categories}
        onEditCategory={handleOpenEditDialog}
        onDeleteCategory={handleOpenDeleteDialog}
      />

      {isAddDialogOpen && (
        <AddCategoryDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSave={handleAddCategory}
        />
      )}

      {editingCategory && isEditDialogOpen && (
        <EditCategoryDialog
          category={editingCategory}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingCategory(null);
          }}
          onSave={handleEditCategory}
        />
      )}

      {categoryToDelete && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete &quot;{categoryToDelete.name}&quot;?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the category. 
                Any threads within this category might become orphaned or inaccessible depending on system setup.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteCategory} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
