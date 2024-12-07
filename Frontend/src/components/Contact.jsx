// src/components/Contact.js

// import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post('http://localhost:5000/api/contact', data)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success('Message sent successfully');
          document.getElementById('contact-form').reset();
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error('Error: ' + err.response.data.message);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[600px]">
        <div className="modal-box">
          <form id="contact-form" onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </Link>

            <h3 className="font-bold text-lg">Contact Us</h3>
            <div className="mt-4 space-y-2">
              <span>Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register('name', { required: true })}
              />
              <br />
              {errors.name && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register('email', { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span>Message</span>
              <br />
              <textarea
                placeholder="Enter your message"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register('message', { required: true })}
              />
              <br />
              {errors.message && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex justify-around mt-4">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
