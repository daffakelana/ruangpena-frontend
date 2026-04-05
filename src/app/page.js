import { BlogSection, HeroSection } from "@/components";
import { rpc } from "@/lib/supabase";

const categories = await rpc("get_all_categories");

export default function Home() {

  return (
    <>
      <div className="main-container">
        <div className="top-content">
          <HeroSection />
          <BlogSection categories={categories} />
        </div>
      </div>
    </>
  );
}
