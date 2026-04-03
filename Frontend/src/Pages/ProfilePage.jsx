import React, { useEffect } from 'react'
import Profile from "../Components/profile/Profile"
import { setError, setLoading, setProfile } from "../Redux/Slices/profileSlice"
import { useDispatch, useSelector } from "react-redux"
import { getUserById } from '../services/userService'
import { HashLoader } from "react-spinners"

function ProfilePage() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.profile);


  useEffect(() => {
    if (!user?._id) return;

    const fetchProfile = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getUserById(user._id);
        if (res) {
          dispatch(setProfile(res));
          // toast.success("Profile fetched successfully"); // Removed for better UX
        }
      } catch (err) {
        const message = err?.response?.data?.message || "Something went wrong";
        console.log(err)
        dispatch(setError(message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProfile();
  }, [dispatch, user]);

  if (loading || (!profile && user?._id)) {
    return (
      <div className='w-full flex justify-center items-center bg-gray-100 min-h-[80vh]'>
        <HashLoader color="#dc2626" />
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full flex justify-center items-center bg-gray-100 min-h-[80vh] text-center p-4'>
        <div>
          <p className='text-red-500 text-lg font-semibold'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[rgb(219,68,68)] text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full flex justify-center bg-gray-100 min-h-[80vh] px-4'>
      {profile && <Profile />}
    </div>
  );
}

export default ProfilePage