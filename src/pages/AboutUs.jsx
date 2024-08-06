import React from 'react';

const AboutUs = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Ink Well</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="mb-2">
            We are a dynamic team of two developers, <strong>Rahul</strong> and <strong>Sumukh</strong>, who have collaborated to build this project. With a passion for creating innovative solutions and a commitment to delivering high-quality software, we combined our skills and expertise to bring <strong>Ink Well</strong> to life.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
          <p className="mb-2">
            For <strong>Ink Well</strong>, we utilized the <strong>MERN</strong> stack—MongoDB, Express.js, React.js, and Node.js—to create a robust and scalable application. Our choice of technology ensures that the application is both efficient and responsive, providing a seamless user experience.
          </p>
          <p className="mb-2">
            In addition, we incorporated <strong>Tailwind CSS</strong> for styling. Tailwind's utility-first approach allowed us to design a modern and visually appealing interface with ease. It helped us maintain consistency across the application and ensured that the design is both functional and aesthetically pleasing.
          </p>
          <p className="mb-2">
            To enhance the user interface further, we integrated <strong>Accertinity UI</strong>. This UI library provided us with a range of components and design patterns that helped us create a polished and user-friendly experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p>
            Our goal was to build an application that is not only powerful and efficient but also easy to use. We believe that by leveraging modern technologies and focusing on user-centric design, we have created something that meets these objectives and delivers value to our users.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
