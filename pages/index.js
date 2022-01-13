import { Heading, Page, TextStyle, Layout, EmptyState } from "@shopify/polaris";
import { useState } from "react";

import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react'
import store from 'store-js';
import ResourceListWithProducts from './components/ResourceList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const Index = () => {

  const [open, setOpen] = useState(false);

  const handleSelection = (resources) => {

    const idsFromResources = resources.selection.map((product) => product.id);

    setOpen(false)
    store.set('ids', idsFromResources)
  }

  // A constant that defines your apps empty state
  const emptyState = !store.get('ids');

  return (

    <Page>
      <TitleBar
        primaryAction={{
          content: 'Select Products',
          onAction: () => setOpen(true)
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariant={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setOpen(false)}
      />
      {emptyState ? (
        <Layout>
          <EmptyState // Empty state component
            heading="Discount products temporarily"
            action={{
              content: 'Select Products',
              onAction: () => setOpen(true)
            }}
            image={img}
          >
            <p>Select products to change their price temporarily.</p>

          </EmptyState>
        </Layout>
      ) : (
        <ResourceListWithProducts />
      )}


    </Page>
  )
};

export default Index;
