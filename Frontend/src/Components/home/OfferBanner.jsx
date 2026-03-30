import React from 'react'
import { useState, useEffect } from 'react'
import Pic1 from "../../assets/Ellipse 23.png"
import Pic2 from "../../assets/Frame 694.png"
import Button  from '../layouts/Button'

export default function Banner() {

    let  timeShowingCircles= "md:size-[68px] max-md:size-[40px] max-md:text-[.6rem] flex flex-col overflow-hidden text-center justify-center items-center rounded-full bg-white text-black "

        const [timeLeft, setTimeLeft] = useState({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        })

        useEffect(() => {
            const targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000) // 7 days from now

            const timer = setInterval(() => {
                const now = new Date().getTime()
                const distance = targetDate - now

                if (distance > 0) {
                    setTimeLeft({
                        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds: Math.floor((distance % (1000 * 60)) / 1000)
                    })
                } else {
                    clearInterval(timer)
                }
            }, 1000)

            return () => clearInterval(timer)
        }, [])

        return (
          <div className='flex   justify-center mx-auto bg-black items-center lg:w-[80vw] overflow-hidden  w-full '>
            <div className='flex flex-col justify-center p-2 sm:p-4 lg:p-10 w-full  h-full'>
                <h2 className='mt-3 md:text-3xl max-md:text-2xl  max-sm:text=lg lg:text-5xl font-bold text-white'>Enhance Your <br></br>Music Experience</h2>
                <div className='flex w-full mt-4 lg:mt-8 items-center gap-3'>
                    <span className={timeShowingCircles}><b>{timeLeft.days}</b> days</span>
                    <span className={timeShowingCircles}><b>{timeLeft.hours}</b> hours</span>
                    <span className={timeShowingCircles}><b> {timeLeft.minutes}</b> minutes</span>
                    <span className={timeShowingCircles}><b>{timeLeft.seconds}</b> seconds</span>
                </div>
                <Button text={"Buy Now"} className='mt-8 bg-green-500' />
            </div >
                <div className='dynamicBanner w-full h-full flex items-center justify-center'>
                    <img className='w-full ' src={Pic2} alt="" />  
                </div>
          </div>
        )
}
