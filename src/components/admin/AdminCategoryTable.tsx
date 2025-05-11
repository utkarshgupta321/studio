
"use client";

import type { ForumCategory } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Folder, ServerIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getLucideIcon } from "@/lib/icon-map";

interface AdminCategoryTableProps {
  categories: ForumCategory[];
  onEditCategory: (category: ForumCategory) => void;
  onDeleteCategory: (categoryId: string, categoryName: string) => void;
}

export function AdminCategoryTable({ categories, onEditCategory, onDeleteCategory }: AdminCategoryTableProps) {
  if (!categories || categories.length === 0) {
    return <Card className="p-4"><p className="text-muted-foreground">No categories found.</p></Card>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Icon</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Server</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Threads</TableHead>
            <TableHead className="text-center">Posts</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            const IconComponent = getLucideIcon(category.iconName) || Folder;
            return (
              <TableRow key={category.id}>
                <TableCell>
                  <IconComponent className="h-5 w-5 text-primary" />
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ServerIcon className="h-4 w-4"/> {category.serverName || category.serverId}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-xs truncate">{category.description}</TableCell>
                <TableCell className="text-center">{category.threadsCount}</TableCell>
                <TableCell className="text-center">{category.postsCount}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Category Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEditCategory(category)}>
                        <Edit className="mr-2 h-4 w-4" />Edit Category
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteCategory(category.id, category.name)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />Delete Category
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
