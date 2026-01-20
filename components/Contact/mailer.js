import emailjs from '@emailjs/browser';

const mail = ({ name, email, message }) => {
  const serviceId =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_9iy7yrq';
  const templateId =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_5y4f81g';
  const publicKey =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'yx1PsFh4noFbGOEmj';

  return emailjs.send(
    serviceId,
    templateId,
    { name, email, message },
    {
      publicKey,
      limitRate: {
        throttle: 10000, // 10s
      },
    }
  );
};

export default mail;
