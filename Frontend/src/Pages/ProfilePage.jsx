import React, { useEffect } from 'react'
import Profile from "../Components/profile/Profile"
import { setError, setLoading, setProfile } from "../Redux/Slices/profileSlice"
import { useDispatch, useSelector } from "react-redux"
import { getUserById } from '../services/userService'
import { toast } from "react-toastify"
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
          toast.success("Profile fetched successfully");
        }
      } catch (err) {
        const message = err?.response?.data?.message;
        dispatch(setError(message || "Something went wrong"));
        toast.error(error || "Something went wrong");
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchProfile();

  }, [dispatch, user._id])





  if (loading) {
    return (
      <div className='w-full flex justify-center items-center bg-gray-100 min-h-[80vh]'>
        <HashLoader color="#dc2626" />
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-full flex justify-center items-center bg-gray-100 min-h-[80vh]'>
        <p className='text-red-500 text-lg font-semibold'>{error}</p>
      </div>
    )
  }

  return (
    <div className='w-full flex justify-center bg-gray-100'>
      {profile && <Profile />}
    </div>
  )
}

export default ProfilePage