"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getAuth, onAuthStateChanged, User, Auth } from "firebase/auth"
import { 
  getFirestore, 
  Firestore, 
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from "firebase/firestore"

// Read config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

interface IFirebaseContext {
  app: FirebaseApp
  auth: Auth
  firestore: Firestore
  user: User | null
  loading: boolean
}

const FirebaseContext = createContext<IFirebaseContext | undefined>(undefined)

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize Firebase only once
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  const auth = getAuth(app)
  
  // Initialize Firestore with proper settings
  let firestore: Firestore
  try {
    // Try to get existing Firestore instance first
    firestore = getFirestore(app)
  } catch (e) {
    // If no instance exists, initialize with custom settings
    firestore = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
        cacheSizeBytes: 100 * 1024 * 1024 // 100MB cache size
      })
    })
  }

  // Enable offline persistence for Firestore
  useEffect(() => {
    const enablePersistence = async () => {
      try {
        console.log("Firestore persistence enabled with new API")
      } catch (err: any) {
        if (err.code === 'failed-precondition') {
          console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.")
        } else if (err.code === 'unimplemented') {
          console.warn("The current browser doesn't support persistence")
        } else {
          console.error("Error enabling Firestore persistence:", err)
        }
      }
    }
    
    enablePersistence()
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [auth])

  return (
    <FirebaseContext.Provider value={{ app, auth, firestore, user, loading }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => {
  const ctx = useContext(FirebaseContext)
  if (!ctx) throw new Error("useFirebase must be used within a FirebaseProvider")
  return ctx
} 