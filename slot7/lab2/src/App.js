import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import MenuGrid from './components/MenuGrid';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main className="container my-4">
        <Banner />
        <MenuGrid />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
