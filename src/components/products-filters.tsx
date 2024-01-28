import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

let useSearchParams: () => URLSearchParams;
if (typeof window !== "undefined") {
  ({ useSearchParams } = require("next/navigation"));
}

const productsFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

type ProductsFilterSchema = z.infer<typeof productsFilterSchema>;

export function ProductsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useSearchParams()
    : new URLSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const { register, handleSubmit } = useForm<ProductsFilterSchema>({
    resolver: zodResolver(productsFilterSchema),
  });

  function handleFilterProducts({ id, name }: ProductsFilterSchema) {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("id", id);
    else params.delete("id");
    if (name) params.set("name", name);
    else params.delete("name");

    router.push(pathname + "?" + params.toString());
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterProducts)}
      className="flex items-center gap-2"
    >
      <Input
        defaultValue={id ?? ""}
        placeholder="ID do produto"
        {...register("id")}
      />
      <Input
        defaultValue={name ?? ""}
        placeholder="Nome do produto"
        {...register("name")}
      />

      <Button type="submit" className="flex gap-1">
        <Search size={17} />
        Filtrar Resultados
      </Button>
    </form>
  );
}
