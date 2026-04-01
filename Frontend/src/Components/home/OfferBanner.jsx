import React from 'react'
import { useState, useEffect } from 'react'
import Pic1 from "../../assets/Ellipse 23.png"
import Pic2 from "../../assets/Frame 694.png"
import Button  from '../layouts/Button'
import { motion as Motion } from 'framer-motion'

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

        const timeItems = [
          { value: timeLeft.days, label: "days" },
          { value: timeLeft.hours, label: "hours" },
          { value: timeLeft.minutes, label: "minutes" },
          { value: timeLeft.seconds, label: "seconds" },
        ];

        return (
          <Motion.div
            className='flex   justify-center mx-auto bg-black items-center lg:w-[80vw] overflow-hidden  w-full '
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Motion.div
              className='flex flex-col justify-center p-2 sm:p-4 lg:p-10 w-full  h-full'
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Motion.h2
                  className='mt-3 md:text-3xl max-md:text-2xl  max-sm:text=lg lg:text-5xl font-bold text-white'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Enhance Your <br></br>Music Experience
                </Motion.h2>
                <div className='flex w-full mt-4 lg:mt-8 items-center gap-3'>
                    {timeItems.map((item, index) => (
                      <Motion.span
                        key={item.label}
                        className={timeShowingCircles}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <b>{item.value}</b>{item.label}
                      </Motion.span>
                    ))}
                </div>
                <Motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Button text={"Buy Now"} className='mt-8 bg-green-500' />
                </Motion.div>
            </Motion.div >
                <Motion.div
                  className='dynamicBanner w-full h-full flex items-center justify-center'
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <img className='w-full ' src={Pic2} alt="" />  
                </Motion.div>
          </Motion.div>
        )
}
