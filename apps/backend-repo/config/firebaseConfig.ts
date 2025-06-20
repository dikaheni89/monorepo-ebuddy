import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '@/config/serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
  });
}

export const db = admin.firestore();
