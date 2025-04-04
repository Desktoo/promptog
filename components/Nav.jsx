"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {


    const {data : session} = useSession();

    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)

    useEffect(()=>{
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response)
        }

        setUpProviders()
    },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href='/' className='flex gap-2 flex-center '>
            <Image 
                src="/assets/images/logo.svg"
                alt="Promptog logo"
                width={30}
                height={30}
                className='object-contain'
            />  
            <p className='logo_text'>Promptog</p>
        </Link>
        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <div className='bg-primary-orange text-white px-3 pt-1 border-0 rounded-xl'>
                        <Link href='/create-prompt' className='text-white font-semibold'>
                            Create Post
                        </Link>
                    </div>
                   

                    <button type='button' onClick={signOut} className='text-white bg-transparent border rounded-xl pb-1 px-3'>
                        Sign Out
                    </button>

                    <Link href="/profile">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt="profile img"
                        />
                    </Link>
                </div>
            ) : (
                <>
                    {providers && 
                            Object.values(providers).map((provider) => (
                                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='bg-primary-orange px-4 py-1 transition-transform hover:scale-105 text-white rounded-xl'>
                                    Sign In
                                </button>
                            ))
                    }
                </>
            )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex felx-col">
                <div className="flex">
                    <Image
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt="profile img"
                        onClick={() => setToggleDropDown(prev => !prev)}
                    />
                </div>

                {toggleDropDown && (
                    <div className="dropdown">
                        <Link 
                            href="/profile" 
                            className='dropdown_link'
                            onClick={() => setToggleDropDown(false)}
                        >
                            My Profile
                        </Link>

                        <Link 
                            href="/create-prompt" 
                            className='dropdown_link'
                            onClick={() => setToggleDropDown(false)}
                        >
                            Create Post
                        </Link>

                        <button 
                            type='button' 
                            onClick={() => {
                                setToggleDropDown(false);
                                signOut();
                            }}
                            className='mt-5 w-full black_btn'
                        >
                            Sign Out
                        </button>
                    </div>
                )}
                </div>
            ) : (
                <>
                    {providers && 
                            Object.values(providers).map((provider) => (
                                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                    Sign In
                                </button>
                            ))
                    }
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav