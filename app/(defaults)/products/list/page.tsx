import ComponentsAppsInvoiceList from '@/components/apps/mailbox/invoice/components-apps-invoice-list';
import ProductsTable from '@/components/products/ProductsTable';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Invoice List',
};

const AllProducts = () => {
    return <ProductsTable />;
};

export default AllProducts;
