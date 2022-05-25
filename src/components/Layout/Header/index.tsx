import Link from 'next/link';
import React, { createContext, useState } from 'react';

export const navSPContext = createContext<ContextValue | null>(null);
interface ContextValue {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = () => {
  const [open, setOpen] = useState(false)
  const value = {
    open,
    setOpen
  }

  const toggleOpen = (toggle: boolean) => {
    setOpen(toggle);
  }

  return (
    <>
      <style jsx>{`
        .nav-container {
          opacity: 0;
          transition: 300ms;
        }
        .nav-container.open {
          opacity: 1;
        }
      `}</style>
      <header className="flex items-center fixed top-0 z-40 px-4 bg-base border-b border-main w-full h-16">
        <div className="container flex justify-between items-center mx-auto">
          <div><Link href='/'>My NoteBook</Link></div>
        </div>
      </header>
      <div className="h-16"></div>
    </>
  )
}

export default Header;