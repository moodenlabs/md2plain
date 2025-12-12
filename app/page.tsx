import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Converter from '@/components/Converter';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Converter />
      <Footer />
    </main>
  );
}
