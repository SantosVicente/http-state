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

let useSearchParams: () => URLSearchParams;
if (typeof window !== "undefined") {
  ({ useSearchParams } = require("next/navigation"));
}

const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;

export function CreateProductDialog() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useSearchParams()
    : new URLSearchParams();

  const { register, handleSubmit } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const { mutateAsync: createProductFn } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: createProduct,
    onSuccess(_, variables) {
      const cachedProducts = queryClient.getQueryData([
        "products",
        id,
        name,
      ]) as Product[];

      queryClient.setQueryData(["products", id, name], (old: Product[]) => {
        console.log(old);
        return [
          ...old,
          {
            id: cachedProducts.length + 1 + Math.floor(Math.random() * 100),
            name: variables.name,
            price: variables.price,
          },
        ];
      });
    },
  });

  async function handleCreateProduct(data: CreateProductSchema) {
    try {
      await createProductFn({
        name: data.name,
        price: data.price,
      });

      toast("Produto criado com sucesso!", {
        className: "bg-green-500 bg-opacity-90 text-white",
      });
    } catch (error) {
      console.error(error);
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
