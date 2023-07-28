import Navbar from "./Navbar";
import Footer from "./footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
