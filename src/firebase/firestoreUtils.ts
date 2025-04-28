import { collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore"
import { Firestore } from "firebase/firestore"

// User stats
export async function getUserStats(firestore: Firestore, uid: string) {
  try {
    console.log(`Fetching user stats for ${uid}`)
    const docRef = doc(firestore, "users", uid)
    const snap = await getDoc(docRef)
    if (snap.exists()) {
      console.log(`User stats found for ${uid}`)
      return snap.data()
    } else {
      console.log(`No user stats found for ${uid}, will initialize`)
      return null
    }
  } catch (error) {
    console.error(`Error fetching user stats for ${uid}:`, error)
    throw error
  }
}

export async function updateUserStats(firestore: Firestore, uid: string, data: any) {
  try {
    console.log(`Updating user stats for ${uid}`)
    const docRef = doc(firestore, "users", uid)
    await setDoc(docRef, data, { merge: true })
    console.log(`User stats updated for ${uid}`)
  } catch (error) {
    console.error(`Error updating user stats for ${uid}:`, error)
    throw error
  }
}

// Challenges
export async function getChallenges(firestore: Firestore) {
  try {
    console.log("Fetching challenges")
    const q = query(collection(firestore, "challenges"), orderBy("createdAt", "desc"))
    const snap = await getDocs(q)
    console.log(`Found ${snap.docs.length} challenges`)
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching challenges:", error)
    throw error
  }
}

export async function joinChallenge(firestore: Firestore, challengeId: string, uid: string) {
  try {
    console.log(`User ${uid} joining challenge ${challengeId}`)
    const ref = doc(firestore, "challenges", challengeId, "participants", uid)
    await setDoc(ref, { joinedAt: serverTimestamp() })
    console.log(`User ${uid} joined challenge ${challengeId}`)
  } catch (error) {
    console.error(`Error joining challenge ${challengeId} for user ${uid}:`, error)
    throw error
  }
}

export async function leaveChallenge(firestore: Firestore, challengeId: string, uid: string) {
  try {
    console.log(`User ${uid} leaving challenge ${challengeId}`)
    const ref = doc(firestore, "challenges", challengeId, "participants", uid)
    await setDoc(ref, {}, { merge: true })
    console.log(`User ${uid} left challenge ${challengeId}`)
  } catch (error) {
    console.error(`Error leaving challenge ${challengeId} for user ${uid}:`, error)
    throw error
  }
}

// Community Feed
export async function getCommunityFeed(firestore: Firestore) {
  try {
    console.log("Fetching community feed")
    const q = query(collection(firestore, "feed"), orderBy("createdAt", "desc"))
    const snap = await getDocs(q)
    console.log(`Found ${snap.docs.length} feed items`)
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching community feed:", error)
    throw error
  }
}

export async function postToFeed(firestore: Firestore, uid: string, content: string) {
  try {
    console.log(`User ${uid} posting to feed`)
    await addDoc(collection(firestore, "feed"), { uid, content, createdAt: serverTimestamp() })
    console.log(`User ${uid} posted to feed`)
  } catch (error) {
    console.error(`Error posting to feed for user ${uid}:`, error)
    throw error
  }
}

// Notifications
export async function getNotifications(firestore: Firestore, uid: string) {
  try {
    console.log(`Fetching notifications for ${uid}`)
    const q = query(collection(firestore, "users", uid, "notifications"), orderBy("createdAt", "desc"))
    const snap = await getDocs(q)
    console.log(`Found ${snap.docs.length} notifications for ${uid}`)
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error(`Error fetching notifications for ${uid}:`, error)
    // Return empty array instead of throwing to prevent dashboard from breaking
    return []
  }
}

// Actions
export async function logUserAction(firestore: Firestore, uid: string, action: any) {
  try {
    console.log(`Logging action for user ${uid}:`, action)
    await addDoc(collection(firestore, "users", uid, "actions"), { ...action, createdAt: serverTimestamp() })
    console.log(`Action logged for user ${uid}`)
  } catch (error) {
    console.error(`Error logging action for user ${uid}:`, error)
    throw error
  }
}

// Leaderboard
export async function getLeaderboard(firestore: Firestore) {
  try {
    console.log("Fetching leaderboard")
    const q = query(collection(firestore, "users"), orderBy("impactScore", "desc"))
    const snap = await getDocs(q)
    console.log(`Found ${snap.docs.length} users for leaderboard`)
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    throw error
  }
}

// Projects
export async function getProjects(firestore: Firestore) {
  try {
    console.log("Fetching projects")
    const q = query(collection(firestore, "projects"), orderBy("createdAt", "desc"))
    const snap = await getDocs(q)
    console.log(`Found ${snap.docs.length} projects`)
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw error
  }
}

// Groups
export async function joinGroup(firestore: Firestore, groupId: string, uid: string) {
  try {
    console.log(`User ${uid} joining group ${groupId}`)
    const ref = doc(firestore, "groups", groupId, "members", uid)
    await setDoc(ref, { joinedAt: serverTimestamp() })
    console.log(`User ${uid} joined group ${groupId}`)
  } catch (error) {
    console.error(`Error joining group ${groupId} for user ${uid}:`, error)
    throw error
  }
}

export async function leaveGroup(firestore: Firestore, groupId: string, uid: string) {
  try {
    console.log(`User ${uid} leaving group ${groupId}`)
    const ref = doc(firestore, "groups", groupId, "members", uid)
    await setDoc(ref, {}, { merge: true })
    console.log(`User ${uid} left group ${groupId}`)
  } catch (error) {
    console.error(`Error leaving group ${groupId} for user ${uid}:`, error)
    throw error
  }
}

// Achievements
export async function getUserAchievements(firestore: Firestore, uid: string) {
  try {
    console.log(`Fetching achievements for ${uid}`)
    const q = query(collection(firestore, "users", uid, "achievements"))
    const snap = await getDocs(q)
    console.log(`Found ${snap.docs.length} achievements for ${uid}`)
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error(`Error fetching achievements for ${uid}:`, error)
    throw error
  }
} 