import type { Product } from './models/product'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { fetchProducts } from './services/product'
import { useProducts } from './hooks/use-products'
import CategorySelector from './components/category-selector'
import ProductGrid from './components/product-grid'
import ProductDetail from './components/product-detail'
import PageTitle from './components/page-title'

function App() {
  const { error, data, isPending } = useQuery({ queryKey: ['products'], queryFn: fetchProducts })
  const { visibleProducts, filterProducts } = useProducts(data)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  if (error) {
    return <div>error</div>
  }

  return (
    <main>
      <div className='px-16 py-12'>
        <PageTitle isPending={isPending} />
        <CategorySelector products={data} onSelectedCategoryChange={filterProducts} />
        <div className='min-h-[20vh]'></div>
        <ProductGrid
          products={visibleProducts}
          isPending={isPending}
          onClickProduct={product => setSelectedProduct(product)}
        />
        {createPortal(
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />,
          document.body,
        )}
      </div>
    </main>
  )
}

export default App
