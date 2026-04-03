import React, { useEffect, useState } from 'react'
import { updateUser, } from "../../services/userService"
import { getMe } from "../../services/authService"
import { HashLoader } from 'react-spinners';

function EditAdminProfile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await getMe();
                setUser(res?.data?.user);
            } catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false)
            }
        }
        fetchUser();
    }, [])

    if (loading) return <div className='flex justify-center items-center h-screen'> <HashLoader /> </div>

    return (
        <div>EditAdminProfile</div>
    )
}

export default EditAdminProfile