"use client";

import { useState } from "react";
import { useGetProductsByUserQuery } from "@/api/frontendApi";
import { Product } from "../../../types/product";

interface Props {
  userId: number;
}

const UserProductList = ({ userId }: Props) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetProductsByUserQuery({
    userId,
    page,
    limit: 5,
  });

  if (isLoading) return <p>Cargando productos...</p>;
  if (isError) return <p>Error al cargar productos.</p>;

  const totalPages = Math.ceil((data?.total || 0) / 5);

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Mis productos</h2>
      <ul>
        {data?.data.map((product: Product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> — {product.description} — $
            {product.price}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          onClick={() => {
            if (page < totalPages) setPage(page + 1);
          }}
          disabled={page >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserProductList;
