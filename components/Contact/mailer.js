import emailjs from '@emailjs/browser';

const mail = ({ name, email, message }) =>
  emailjs.send(
    'service_9iy7yrq',
    'template_5y4f81g',
    { name, email, message },
    {
      publicKey: 'yx1PsFh4noFbGOEmj',
      limitRate: {
        throttle: 10000, // 10s
      },
    }
  );

export default mail;
