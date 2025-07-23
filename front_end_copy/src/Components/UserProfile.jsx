// src/components/UserProfile.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

export const UserProfile = () => {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setPhotoURL(currentUser.photoURL || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update auth profile
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoURL || null
      });

      // Update Firestore document
      await updateDoc(doc(db, 'users', currentUser.uid), {
        displayName,
        photoURL: photoURL || null,
        updatedAt: new Date()
      });

      alert('Profile updated successfully!');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Profile Photo URL</label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="https://example.com/photo.jpg"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};