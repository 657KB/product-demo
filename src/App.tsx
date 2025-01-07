import { useQuery } from '@tanstack/react-query'
import { createPortal } from 'react-dom'
import { fetchProducts } from './services/product'
import { useProducts } from './hooks/use-products'
import CategorySelector from './components/category-selector'
import ProductGrid from './components/product-grid'
import ProductDetail from './components/product-detail'
import PageTitle from './components/page-title'
import { useSelectProduct } from './hooks/use-select-product'
import { useCategory } from './hooks/use-category'

function App() {
  const { error, data, isPending } = useQuery({ queryKey: ['products'], queryFn: fetchProducts })
  const { categories, selectedCategory, setSelectedCategory } = useCategory(data)
  const { selectedProduct, setSelectedProduct } = useSelectProduct()
  const { visibleProducts } = useProducts(data, selectedCategory)

  if (error) {
    return <div>error</div>
  }

  return (
    <main>
      <div className='px-4 py-4 md:px-16 md:py-12'>
        <PageTitle isPending={isPending} />
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectedCategoryChange={setSelectedCategory}
        />
        <div className='min-h-[20vh]'></div>
        <ProductGrid
          products={visibleProducts}
          selectedProduct={selectedProduct}
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
