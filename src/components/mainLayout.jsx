import Footer from "./footer";
import Navbar from "./navbar";


export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar />
      <main className="flex-1 flex flex-col bg-sky-100">{children}</main>
      <Footer />
    </div>
  );
}
