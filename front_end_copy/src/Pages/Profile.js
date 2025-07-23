// src/pages/Profile.js
const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    };
    fetchUserData();
  }, [currentUser]);
  
  return (
    <div>
      <h2>{userData?.name}'s Profile</h2>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};