import React, {useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import Logo from '../img/buildmyclassroom.svg'
const Forget = () => {
    const [formData, setFormData] = useState({
        email:"",
        textChange:'Submit'
    })
    const {email, textChange} = formData
    //Handle inputs
    const handleChange = text=>e=>{
        setFormData({...formData, [text]:e.target.value})
    }
    //send data to backend
    const handleSubmit =e=>{
        e.preventDefault()
        if(email){
            setFormData({...formData, textChange:'Submit'})
            axios.put(`http://localhost:8000/api/forgotpassword`,{
                        email: email
                    }).then(res=>{
                        setFormData({...formData,
                            email:"",textChange:'Submitting....'
                        })
                        toast.success(`Password Reset Link is sent to ${email}`)
                        setTimeout(()=>{
                            window.close()
                        }, 4000)
                    }).catch(err=>{
                        toast.error("Email not valid. Must be your U of R email")
                    })
        }else{
            toast.error("Please fill all fields")
        }
    }
  return (
    <div className='min-h-screen bg gray-100 text-gray-900 flex justify-center'>
        <ToastContainer/>
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
            <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12 mt-20'>
                <div className='mt-2 flex flex-col items-center'>
                    <img className= "h-48 w-48 " src={Logo} alt="logo"/>
                </div>
                <form className='w-full flex-1 mt-8 text-indigo-500' onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-xs relative">
                        <input type="text" placeholder='Email' onChange= {handleChange('email')}
                        value={email}
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                         />
                         <button type="submit"
                         className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                         >
                            <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                            <span className='ml-3'>{textChange}</span>
                         </button>
                    </div>
                    <div className='my-12 border-b text-center'>
                        <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                            Or Login
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <a
                            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                            bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                            href='/login'
                            target='_self'
                        >
                            <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                            <span className='ml-4'>Login</span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Forget