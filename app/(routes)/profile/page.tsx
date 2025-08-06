"use client";

import React from 'react'
import { useSession, signOut } from "next-auth/react";
import { Button } from '@/components/ui/button';


const ProfilePage = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (!session) {
        return <div className="text-red-500">Login required.</div>;
    }

  return (
    <div className="p-6 max-w-md mx-auto mt-24 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
        <p><strong>ID:</strong> {session.user.id}</p>
        <p><strong>First Name:</strong> {session.user.firstName}</p>
        <p><strong>Last Name:</strong> {session.user.lastName}</p>
        <p><strong>Email:</strong> {session.user.email}</p>
        <h2 className="mt-4 text-lg font-semibold">Token</h2>
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(session.user.token, null, 2)}
        </pre>

        <Button 
            onClick={()=>signOut({callbackUrl:"/login"})}
        >
            Signout
        </Button>


        
    </div>
  )
}

export default ProfilePage