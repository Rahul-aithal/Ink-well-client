        <textarea
          ref={textareaRef}
          name="story"
          id="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Start here..."
          rows={18}
          className="w-full p-4 border-2 border-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600 overflow-auto"
          style={{ overflow: "auto" }}
        ></textarea>


        import React from 'react'
        
        function textarea() {
          return (
            <div>
              
            </div>
          )
        }
        
        export default text-area
        