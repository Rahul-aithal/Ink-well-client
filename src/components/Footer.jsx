import React from 'react'

function Footer() {
  return (
  
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2023 StoryScribe. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      
    
    
  )
}

export default Footer
