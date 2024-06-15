export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 text-center w-full bottom-0 fixed">
      <p> Made with ❤️ by Praveen</p>
      <p> &copy; {year} All rights reserved</p>
    </footer>
  );
}
