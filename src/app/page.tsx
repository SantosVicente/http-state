"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Search, PlusCircle } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Product, getProducts } from "@/data/products";
import { useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);

  getProducts().then((products) => {
    setProducts(products);
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Produtos</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Toggle Theme">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("light")}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("dark")}
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("system")}
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center justify-between">
        <form className="flex items-center gap-2">
          <Input name="id" placeholder="ID do produto" />
          <Input name="name" placeholder="Nome do produto" />
          <Button type="submit" className="flex gap-1">
            <Search size={17} />
            Filtrar Resultados
          </Button>
        </form>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-1">
              <PlusCircle size={17} />
              Novo Produto
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Produto</DialogTitle>
              <DialogDescription>
                Criar novo produto no sistema
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
              <div className="grid grid-cols-4 items-center text-right gap-4">
                <Label htmlFor="name">Produto</Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center text-right gap-4">
                <Label htmlFor="price">Preço</Label>
                <Input id="price" className="col-span-3" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="mr-2" variant={"destructive"}>
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit">Criar Produto</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, i) => (
              <TableRow key={i}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
