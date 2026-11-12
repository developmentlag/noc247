import Header from './Header';
import Footer from './Footer';
import StickyBook from './StickyBook';

export default function MarketingShell({ children, activePath = '' }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-brand-700 antialiased font-sans">
      <Header activePath={activePath} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyBook />
    </div>
  );
}
