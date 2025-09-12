"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"

export default function TradeOriginForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("leads").insert([{ name, email }])

      if (error) {
        console.error("Error inserting lead:", error.message)
        alert("Something went wrong, please try again.")
        setLoading(false)
        return
      }

      console.log("Lead added successfully")

      const brochureUrl = process.env.NEXT_PUBLIC_BROCHURE_URL
      if (brochureUrl) {
        router.push(brochureUrl)
      } else {
        alert("Brochure link not found.")
      }
    } catch (err) {
      console.error("Unexpected error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-sm mx-auto w-full">
        <div className="mb-12 text-center">
          <img src="/logo.png" alt="TradeOrigin by Techsol" className="h-20 w-auto mx-auto" />
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-700 text-base leading-relaxed">
            Welcome to <span className="text-orange-500 font-medium">Money 20/20</span> Techsol Booth
          </p>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-700 text-base leading-relaxed">
            Before accessing the product information, please fill out this short form
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 bg-gray-100 border-0 rounded-md text-gray-900 placeholder-gray-500 focus:bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:ring-offset-0"
              required
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 bg-gray-100 border-0 rounded-md text-gray-900 placeholder-gray-500 focus:bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:ring-offset-0"
              required
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
            >
              {loading ? "Submitting..." : "Take me to brochure"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
