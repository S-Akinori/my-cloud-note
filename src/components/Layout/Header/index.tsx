import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import Link from 'next/link';
import React, { createContext, useState } from 'react';

export const navSPContext = createContext<ContextValue | null>(null);
interface ContextValue {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [btnText, setBtnText] = useState('同期')
  const value = {
    open,
    setOpen
  }

  const syncNote = async () => {
    if(process.env.NEXT_PUBLIC_DEPLOY_HOOK_URL) {
      setLoading(true)
      const res = await fetch(process.env.NEXT_PUBLIC_DEPLOY_HOOK_URL, {
        method: 'POST'
      })
      if(res.ok) {
        setBtnText('同期しました')
        setTimeout(() => {
          setBtnText('同期')
        }, 1000)
      }
    }
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
          <div><LoadingButton onClick={syncNote} loading={loading}>{btnText}</LoadingButton></div>
        </div>
      </header>
      <div className="h-16"></div>
    </>
  )
}

export default Header;