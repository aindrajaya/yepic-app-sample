import Link from 'next/link';
import Image from 'next/image'; // Import the Image component from Next.js

const Header = () => {
  return (
    <header className="bg-purple-600 py-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-white text-lg font-semibold" id='link'>
            <div className="flex items-center">
              {/* Use the Image component for your logo */}
              <Image
                src="https://files.readme.io/d7307ef-small-yepic-api.png" // Path to your PNG image in the public directory
                alt="Image Voiceover Generator Logo"
                width={80} // Set the desired width
                height={80} // Set the desired height
              />
              <text className="px-10">
              Email Video Generator 
              </text>
              
            </div>
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about" id='link' className="text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" id='link' className="text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
