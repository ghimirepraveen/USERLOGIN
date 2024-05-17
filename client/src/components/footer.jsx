const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer w-full bg-stone-400 text-center">
      <p>&copy; {year} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
