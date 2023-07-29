import CategoryCard from "@/components/CategoryCard"
import ProductCard from "@/components/productCard"

export default function Home ({featuredProducts, featuredCategories}) {
  return (
    <main>
      <h3>Featured Products:</h3>
      {
          featuredProducts?.length > 0 && 
          featuredProducts?.map(product => <ProductCard key={product?._id} product={product}/>)
      }
      <h3>Featured Categories:</h3>
      {
          featuredCategories?.length > 0 && 
          featuredCategories?.map(category => <CategoryCard key={category?._id} category={category}/>)
      }
    </main>
  )
}

export const getStaticProps = async () => {
  const products = await fetch('http://localhost:3000/api/products/featured-products')
  const featuredProducts = await products.json()
  const categories = await fetch('http://localhost:3000/api/products/featured-categories')
  const featuredCategories = await categories.json()
  return { props: { 
    featuredProducts,
    featuredCategories
   } }
}
 

