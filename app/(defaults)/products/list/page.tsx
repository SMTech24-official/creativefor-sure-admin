import ProductsTable from "@/components/products/ProductsTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Product List",
};

const AllProducts = () => {
    return <ProductsTable />;
};

export default AllProducts;
