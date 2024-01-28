import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productsFilterSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
});

type ProductsFilterSchema = z.infer<typeof productsFilterSchema>;

export function ProductsFilter() {
  const { register, handleSubmit } = useForm<ProductsFilterSchema>({
    resolver: zodResolver(productsFilterSchema),
  });

  function handleFilterProducts(data: ProductsFilterSchema) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterProducts)}
      className="flex items-center gap-2"
    >
      <Input placeholder="ID do produto" {...register("id")} />
      <Input placeholder="Nome do produto" {...register("name")} />

      <Button type="submit" className="flex gap-1">
        <Search size={17} />
        Filtrar Resultados
      </Button>
    </form>
  );
}
