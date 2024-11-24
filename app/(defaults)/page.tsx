import ProductsTable from "@/components/products/ProductsTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Dashboard",
};

const AllProducts = () => {
    return <ProductsTable />;
};

export default AllProducts;
