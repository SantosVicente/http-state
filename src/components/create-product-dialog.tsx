import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, createProduct } from "@/data/products";
import { toast } from "sonner";

const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;

export function CreateProductDialog() {
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const { mutateAsync: createProductFn } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: createProduct,
    onSuccess(data, variables) {
      if (data.status === 201) {
        //const cachedProducts = queryClient.getQueryData([
        //s  "products",
        //]) as Product[];

        queryClient.setQueryData(["products"], (old: Product[]) => {
          return [
            ...old,
            {
              id: crypto.randomUUID(),
              name: variables.name,
              price: variables.price,
            },
          ];
        });

        toast(data.msg, {
          className: "bg-green-500 bg-opacity-90 text-white",
        });
      }
    },
  });

  async function handleCreateProduct(data: CreateProductSchema) {
    try {
      await createProductFn({
        name: data.name,
        price: data.price,
      });
    } catch (error) {
      toast("Erro ao criar produto", {
        description:
          "Sinto muito, ocorreu um erro ao criar o produto. Tente novamente mais tarde.",
        className: "bg-red-500 bg-opacity-90 text-white",
      });
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Produto</DialogTitle>
        <DialogDescription>Criar novo produto no sistema</DialogDescription>
      </DialogHeader>

      <form className="space-y-6" onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="grid grid-cols-4 items-center text-right gap-4">
          <Label htmlFor="name">Produto</Label>
          <Input id="name" className="col-span-3" {...register("name")} />
        </div>
        <div className="grid grid-cols-4 items-center text-right gap-4">
          <Label htmlFor="price">Preço</Label>
          <Input id="price" className="col-span-3" {...register("price")} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="mr-2" variant={"destructive"}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Criar Produto</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
