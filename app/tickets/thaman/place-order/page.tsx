'use client'

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function ThamanPlaceOrder() {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showFullTips, setShowFullTips] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Event data extracted from database
  const eventData = {
    name: "Thaman Live in Concert",
    title: "Thaman Live in Concert - MILAN 26'",
    description: "Experience the musical maestro Thaman S in an electrifying live performance at MILAN 26! Get ready to be mesmerized by his iconic compositions and powerful vocals as he takes the stage for an unforgettable night of music and celebration.",
    fullDescription: "Experience the musical maestro Thaman S in an electrifying live performance at MILAN 26! Get ready to be mesmerized by his iconic compositions and powerful vocals as he takes the stage for an unforgettable night of music and celebration. Thaman S, the renowned music director and composer, will showcase his greatest hits spanning multiple languages and genres. This is your chance to witness one of India's most celebrated music talents live in action. Don't miss out on this spectacular event that promises to be the highlight of MILAN 26!",
    date: "Sat 15 Feb 2026",
    time: "7:00 PM",
    duration: "3 Hours",
    ageGroup: "All age groups",
    languages: "Telugu, Tamil, Hindi, English",
    genres: "Film Music, Pop, Classical Fusion",
    location: "Main Stage: MILAN 26",
    venue: "Main Stage",
    price: "₹1500",
    priceRange: "₹1500 onwards",
    availability: "Filling Fast",
    bookingStatus: "Bookings are filling fast for this event",
    images: [
      "/ProShowTickets/Thaman/FinalShowcase/image1.png",
      "/ProShowTickets/Thaman/FinalShowcase/image2.png",
      "/ProShowTickets/Thaman/FinalShowcase/image3.png"
    ],
    categories: ["Concerts", "Music Festivals", "Pro Shows"],
    tips: [
      "VIP, Gold, and Silver sections available - choose your preferred seating!",
      "Doors open 30 minutes before the show. Arrive early to avoid queues.",
      "Photography and videography allowed, but please be respectful of other attendees.",
      "Food and beverages will be available at the venue.",
      "Parking facilities are available near the venue."
    ]
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % eventData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + eventData.images.length) % eventData.images.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Share Icon - Add padding top to avoid header overlap */}
      <div className="container mx-auto px-4 py-6 pt-24">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <Link href="/tickets" className="text-blue-600" data-no-cursor-text>
              ← Back to Tickets
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-black">{eventData.title}</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Banner and Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Banner with Carousel */}
            <div className="relative w-full rounded-lg overflow-hidden bg-gray-100">
              <div className="relative w-full flex items-center justify-center" style={{ minHeight: '600px' }}>
                <Image
                  src={eventData.images[currentImageIndex]}
                  alt={`${eventData.name} - Image ${currentImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain w-full h-auto max-h-[800px]"
                  priority={currentImageIndex === 0}
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>

              {/* Navigation Arrows */}
              {eventData.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Carousel Dots */}
              {eventData.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {eventData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-3">
              {eventData.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 cursor-pointer transition-colors"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* About The Event */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-black">About The Event</h2>
              <p className="text-gray-700 leading-relaxed">
                {showFullDescription ? eventData.fullDescription : eventData.description}
                {!showFullDescription && eventData.fullDescription.length > eventData.description.length && (
                  <span>...</span>
                )}
              </p>
              {eventData.fullDescription.length > eventData.description.length && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </button>
              )}
            </div>

            {/* You Should Know */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-black">You Should Know</h2>
              <div className="space-y-3">
                {eventData.tips.slice(0, showFullTips ? eventData.tips.length : 1).map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
              {eventData.tips.length > 1 && (
                <button
                  onClick={() => setShowFullTips(!showFullTips)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {showFullTips ? "See Less" : "See More"}
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Booking Information */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white border border-gray-200 rounded-lg p-6 shadow-lg space-y-6">
              {/* Event Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="text-lg font-semibold text-black">{eventData.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Time</p>
                  <p className="text-lg font-semibold text-black">{eventData.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration</p>
                  <p className="text-lg font-semibold text-black">{eventData.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Age Group</p>
                  <p className="text-lg font-semibold text-black">{eventData.ageGroup}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Languages</p>
                  <p className="text-lg font-semibold text-black">{eventData.languages}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Genres</p>
                  <p className="text-lg font-semibold text-black">{eventData.genres}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-lg font-semibold text-black">{eventData.location}</p>
                    <button className="ml-2 p-1 hover:bg-gray-100 rounded">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Booking Status */}
              <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-yellow-800">{eventData.bookingStatus}</p>
              </div>

              {/* Pass Option */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-black mb-2">Buy All Days Pass Now</h3>
                <p className="text-sm text-gray-600 mb-4">Enjoy the event across all days!</p>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-black">{eventData.priceRange}</span>
                  </div>
                  <p className={`text-sm font-medium ${eventData.availability === "Filling Fast" ? "text-orange-600" : "text-green-600"}`}>
                    {eventData.availability}
                  </p>
                </div>
              </div>

              {/* Book Now Button */}
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full text-lg transition-colors shadow-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
