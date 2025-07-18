'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Colors from '@/data/Colors';
import { UserButton, useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Header() {
  const router = useRouter();
  const { isSignedIn, isLoaded, user } = useUser();
  const createUser = useMutation(api.users.CreateUser);

  // Sync Clerk user to Convex DB
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      createUser({
        uid: user.id,
        name: user.fullName || "Unnamed",
        email: user.emailAddresses[0]?.emailAddress || "",
        picture: user.imageUrl || "",
      });
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <div className='p-4 flex justify-between items-center'>
      <Image src="/logo.png" alt="Bolt Logo" width={50} height={50} />

      {!isLoaded ? null : isSignedIn ? (
        <div className="flex items-center">
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <div className='flex gap-5'>
          <Button
            variant="ghost"
            className="text-black bg-white"
            onClick={() => router.push('/sign-in')}
          >
            Sign In
          </Button>
          <Button
            className="text-white"
            style={{ backgroundColor: Colors.BLUE }}
            onClick={() => router.push('/sign-up')}
          >
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
