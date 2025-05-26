'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function TestConnection() {
  const [status, setStatus] = useState<string>('Checking connection...')
  const [details, setDetails] = useState<any>(null)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Create Supabase client
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Test the connection
        const { data, error } = await supabase.from('_test_').select('*').limit(1)
        
        if (error && error.code !== 'PGRST116') {
          setStatus('❌ Connection failed')
          setDetails(error)
        } else {
          setStatus('✅ Supabase connected successfully!')
          setDetails({
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length
          })
        }
      } catch (err) {
        setStatus('❌ Error connecting')
        setDetails(err)
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <p className="text-xl mb-4">{status}</p>
        
        {details && (
          <div className="mt-4 p-4 bg-gray-700 rounded">
            <pre className="text-sm">{JSON.stringify(details, null, 2)}</pre>
          </div>
        )}
      </div>
      
      <a href="/" className="mt-8 inline-block text-blue-400 hover:text-blue-300">
        ← Back to home
      </a>
    </div>
  )
}
