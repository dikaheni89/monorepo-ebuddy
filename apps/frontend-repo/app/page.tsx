'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import UpdateButton from '@/components/UpdateButton';
import {auth} from "@/app/config/firebase";
import UpdateUserForm from "@/components/UpdateUserForm";

export default function MainPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUserEmail(user.email ?? null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Main Page</h1>
      {userEmail && <p>Welcome, {userEmail}</p>}
      <UpdateButton />
      <UpdateUserForm />
    </main>
  );
}
