import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "./Button";
import { useForm, ValidationError } from '@formspree/react';
import {HashLoader} from "react-spinners"
import {toast} from "react-toastify"

export default function Contact() {
  const [state, handleSubmit] = useForm("xqeygklg");


  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="space-y-8 rounded-md p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#db4444] text-white">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Call To Us</h3>
              <p className="text-sm text-gray-600">We are available 24/7, 7 days a week.</p>

              <p className="mt-2 font-medium text-sm">Phone:<a className="hover:text-[crimson] cursor-pointer font-semibold " href="tel:+923284169020">+923284169020</a>  </p>

            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#db4444] text-white">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Write To Us</h3>
              <p className="mt-2 font-medium text-sm">Email: 
                 <a className="hover:text-[crimson] cursor-pointer font-semibold " href={"mailto:m.aqibali3040@gmail.com"}>m.aqibali3040@gmail.com</a>
                  </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 rounded-md bg-white px-3 py-6 md:p-8 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name *"
                className="w-full rounded bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#db4444]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email *"
                className="w-full rounded bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#db4444]"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Your Phone *"
                className="w-full rounded bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#db4444]"
              />
            </div>
            <textarea
              name="message"
              required
              rows="6"
              placeholder="Your Message"
              className="w-full rounded bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#db4444] resize-none"
            ></textarea>
             {state.submitting ?  <div className="flex justify-center items-center">
                <HashLoader/>
              </div> : state.succeeded ? toast.success("Message sent successfully") : state.errors ? toast.error(state.errors) : null  }
            <div className="flex justify-center sm:justify-end">
              <Button
                text="Send Message"
                type="submit"
                className="w-full sm:w-auto px-10 py-4"
                icon={<Send size={18} />}
                disabled={state.submitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
