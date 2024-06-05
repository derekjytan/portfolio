import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <section className='max-container'>
      <div className='flex-1 min-w-50% flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>
      </div>
      <Footer />
    </section>
  )
}

export default Contact