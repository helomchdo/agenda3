import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail,
    updateProfile
  } from "firebase/auth";
  import { auth } from "./firebase";
  
  export const doCreateUserWithEmailAndPassword = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      return userCredential;
    } catch (error) {
      throw error;
    }
  };
  
  export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  export const doPasswordReset = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  
  export const doSignOut = () => {
    return auth.signOut();
  };