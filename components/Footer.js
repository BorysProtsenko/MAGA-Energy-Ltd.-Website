export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Maga Energy Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
