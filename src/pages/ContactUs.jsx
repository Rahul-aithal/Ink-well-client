
import React, { useState } from "react";
import Button from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const ContactUs = () => {
  const [userEmail, setUserEmail] = useState("");
  const [subject, setSubject] = useState("");

  const handleUserEmailChange = (e) => setUserEmail(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    alert("Form submitted!"); 
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        
        <p className="mb-4">
          Please provide your email and the subject of your message. We will get back to you as soon as possible.
          <br />
          You can also reach us directly at <a href="mailto:aithalrahul34@gmail.com" className="text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">aithalrahul34@gmail.com</a>.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="user-email" className="block text-sm font-medium mb-2">
              Your Email
            </Label>
            <Input
              id="user-email"
              type="email"
              value={userEmail}
              onChange={handleUserEmailChange}
              placeholder="Your email address"
              className="p-2 border border-gray-300 rounded-md w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </Label>
            <Input
              id="subject"
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="Subject of your message"
              className="p-2 border border-gray-300 rounded-md w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
              required
            />
          </div>

          <Button
            type="submit"
            className=""
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
