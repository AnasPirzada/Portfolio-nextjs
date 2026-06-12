import { RevealFade, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import Filter from 'bad-words';
import { m } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MENULINKS } from '../../constants';
import styles from './Contact.module.scss';
import mail from './mailer';

const filter = new Filter();
filter.removeWords('hell', 'god', 'shit');

const toastOptions = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
    fontFamily: 'sans-serif',
  },
};

const empty = () =>
  toast.error('Please fill the required fields', {
    id: 'error',
  });

const error = () =>
  toast.error('Error sending your message', {
    id: 'error',
  });

const success = () =>
  toast.success('Message sent successfully', {
    id: 'success',
  });

const Contact = () => {
  const initialState = { name: '', email: '', message: '', website: '' }; // Honeypot field
  const [formData, setFormData] = useState(initialState);
  const [mailerResponse, setMailerResponse] = useState('not initiated');
  const [isSending, setIsSending] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [messageLength, setMessageLength] = useState(0);
  const buttonElementRef = useRef(null);

  const MAX_MESSAGE_LENGTH = 2000;

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field, value) => {
    const errors = { ...validationErrors };

    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'name':
        if (value && value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters';
        } else {
          delete errors.name;
        }
        break;
      case 'message':
        if (value && value.trim().length < 10) {
          errors.message = 'Message must be at least 10 characters';
        } else if (value.length > MAX_MESSAGE_LENGTH) {
          errors.message = `Message must be less than ${MAX_MESSAGE_LENGTH} characters`;
        } else {
          delete errors.message;
        }
        setMessageLength(value.length);
        break;
      default:
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    value.length === 0 ? setIsSending(false) : setIsSending(true);

    // Real-time validation
    if (value) {
      validateField(id, value);
    } else {
      // Clear error if field is empty
      const errors = { ...validationErrors };
      delete errors[id];
      setValidationErrors(errors);
      if (id === 'message') {
        setMessageLength(0);
      }
    }

    setFormData(prevVal => {
      if (
        value.trim() !== prevVal[id] &&
        value.trim().length > prevVal[id].trim().length
      ) {
        return { ...prevVal, [id]: filter.clean(value.trim()) };
      } else {
        return { ...prevVal, [id]: value };
      }
    });
  };

  const emptyForm = () => {
    setFormData(initialState);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Honeypot check - if filled, it's a bot
    if (formData.website && formData.website.trim() !== '') {
      // Silently fail - don't show error to bots
      return;
    }

    // Rate limiting - max 3 submissions per minute
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;

    if (timeSinceLastSubmit < 60000 && submitCount >= 3) {
      toast.error('Please wait before submitting again', {
        id: 'rate-limit',
      });
      return;
    }

    // Reset counter if more than a minute has passed
    if (timeSinceLastSubmit >= 60000) {
      setSubmitCount(0);
    }

    const { name, email, message } = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    if (name === '' || email === '' || message === '') {
      empty();
      return setMailerResponse('empty');
    }

    // Email validation
    if (!validateEmail(email)) {
      setValidationErrors({
        ...validationErrors,
        email: 'Please enter a valid email address',
      });
      toast.error('Please enter a valid email address', {
        id: 'email-error',
      });
      return;
    }

    // Check validation errors
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the errors in the form', {
        id: 'validation-error',
      });
      return;
    }

    setIsSending(true);
    setSubmitCount(prev => prev + 1);
    setLastSubmitTime(now);

    mail({ name, email, message })
      .then(res => {
        if (res.status === 200) {
          setMailerResponse('success');
          emptyForm();
          setSubmitCount(0);
        } else {
          setMailerResponse('error');
        }
        setIsSending(false);
      })
      .catch(err => {
        setMailerResponse('error');
        setIsSending(false);
        console.error(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setMailerResponse('not initiated');
    }, 10000);
  }, [mailerResponse]);

  useEffect(() => {
    buttonElementRef.current.addEventListener('click', e => {
      if (!buttonElementRef.current.classList.contains('active')) {
        buttonElementRef.current.classList.add('active');

        gsap.to(buttonElementRef.current, {
          keyframes: [
            {
              '--left-wing-first-x': 50,
              '--left-wing-first-y': 100,
              '--right-wing-second-x': 50,
              '--right-wing-second-y': 100,
              duration: 0.2,
              onComplete() {
                gsap.set(buttonElementRef.current, {
                  '--left-wing-first-y': 0,
                  '--left-wing-second-x': 40,
                  '--left-wing-second-y': 100,
                  '--left-wing-third-x': 0,
                  '--left-wing-third-y': 100,
                  '--left-body-third-x': 40,
                  '--right-wing-first-x': 50,
                  '--right-wing-first-y': 0,
                  '--right-wing-second-x': 60,
                  '--right-wing-second-y': 100,
                  '--right-wing-third-x': 100,
                  '--right-wing-third-y': 100,
                  '--right-body-third-x': 60,
                });
              },
            },
            {
              '--left-wing-third-x': 20,
              '--left-wing-third-y': 90,
              '--left-wing-second-y': 90,
              '--left-body-third-y': 90,
              '--right-wing-third-x': 80,
              '--right-wing-third-y': 90,
              '--right-body-third-y': 90,
              '--right-wing-second-y': 90,
              duration: 0.2,
            },
            {
              '--rotate': 50,
              '--left-wing-third-y': 95,
              '--left-wing-third-x': 27,
              '--right-body-third-x': 45,
              '--right-wing-second-x': 45,
              '--right-wing-third-x': 60,
              '--right-wing-third-y': 83,
              duration: 0.25,
            },
            {
              '--rotate': 60,
              '--plane-x': -8,
              '--plane-y': 40,
              duration: 0.2,
            },
            {
              '--rotate': 40,
              '--plane-x': 45,
              '--plane-y': -300,
              '--plane-opacity': 0,
              duration: 0.375,
              onComplete() {
                setTimeout(() => {
                  buttonElementRef.current.removeAttribute('style');
                  gsap.fromTo(
                    buttonElementRef.current,
                    {
                      opacity: 0,
                      y: -8,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      clearProps: true,
                      duration: 0.3,
                      onComplete() {
                        buttonElementRef.current.classList.remove('active');
                      },
                    }
                  );
                }, 1800);
              },
            },
          ],
        });

        gsap.to(buttonElementRef.current, {
          keyframes: [
            {
              '--text-opacity': 0,
              '--border-radius': 0,
              '--left-wing-background': 'var(--accent-light)',
              '--right-wing-background': 'var(--accent-light)',
              duration: 0.11,
            },
            {
              '--left-wing-background': 'var(--accent-dark)',
              '--right-wing-background': 'var(--accent-dark)',
              duration: 0.14,
            },
            {
              '--left-body-background': 'var(--accent-light)',
              '--right-body-background': 'var(--accent-light)',
              duration: 0.25,
              delay: 0.1,
            },
            {
              '--trails-stroke': 171,
              duration: 0.22,
              delay: 0.22,
            },
            {
              '--success-opacity': 1,
              '--success-x': 0,
              duration: 0.2,
              delay: 0.15,
            },
            {
              '--success-stroke': 0,
              duration: 0.15,
            },
          ],
        });
      }
    });
  }, [buttonElementRef]);

  return (
    <section
      id={MENULINKS[5].ref}
      className="w-full relative select-none bg-light-bg dark:bg-black py-10 md:py-20"
    >
      <div>
        <Toaster toastOptions={toastOptions} />
      </div>
      <div className="section-container flex flex-col justify-center">
        <RevealStagger className="flex flex-col contact-wrapper">
          <div className="flex flex-col">
            <RevealItem
              as={m.p}
              className="uppercase tracking-widest text-gray-light-1 text-xs sm:text-sm md:text-base"
            >
              CONTACT
            </RevealItem>
            <RevealItem
              as={m.h1}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-6xl mt-2 font-medium text-gradient w-fit"
            >
              Contact
            </RevealItem>
          </div>
          <RevealItem
            as={m.h2}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium md:max-w-lg w-full mt-2"
          >
            Get In Touch.{' '}
          </RevealItem>
        </RevealStagger>

        <form className="pt-8 sm:pt-10 w-full sm:mx-auto sm:w-[30rem] md:w-[35rem] max-w-full px-0">
          <RevealFade>
            <div className="relative">
              <input
                type="text"
                id="name"
                className={`block w-full h-12 sm:h-14 px-4 text-base sm:text-xl font-mono outline-none border-2 rounded-[0.6rem] transition-all duration-200 bg-transparent dark:bg-transparent ${
                  validationErrors.name ? 'border-red-500' : 'border-yellow'
                }`}
                value={formData.name}
                onChange={handleChange}
                onBlur={() => validateField('name', formData.name)}
                required
                aria-label="Name"
                aria-required="true"
                aria-invalid={!!validationErrors.name}
                aria-describedby={
                  validationErrors.name ? 'name-error' : undefined
                }
                style={{ backgroundColor: 'transparent' }}
              />
              <label
                htmlFor="name"
                className={`absolute top-0 left-0 h-full flex items-center pl-4 text-lg font-mono transform transition-all pointer-events-none ${
                  formData.name ? '!h-[50%] !pl-0 !-translate-y-full' : ''
                }`}
              >
                Name
              </label>
              {/* Error message */}
              {validationErrors.name && (
                <div
                  id="name-error"
                  className="absolute -bottom-6 left-0 text-sm text-red-500 font-mono"
                  role="alert"
                  aria-live="assertive"
                >
                  {validationErrors.name}
                </div>
              )}
            </div>

            <div className="relative mt-8 sm:mt-14">
              <input
                type="email"
                id="email"
                className={`block w-full h-12 sm:h-14 px-4 text-base sm:text-xl font-mono outline-none border-2 rounded-[0.6rem] transition-all duration-200 bg-transparent dark:bg-transparent ${
                  validationErrors.email ? 'border-red-500' : 'border-yellow'
                }`}
                value={formData.email}
                onChange={handleChange}
                onBlur={() => validateField('email', formData.email)}
                required
                aria-label="Email address"
                aria-required="true"
                aria-invalid={!!validationErrors.email}
                aria-describedby={
                  validationErrors.email ? 'email-error' : undefined
                }
                autoComplete="email"
                style={{ backgroundColor: 'transparent' }}
              />
              <label
                htmlFor="email"
                className="absolute top-0 left-0 h-full flex items-center pl-4 text-lg font-mono transform transition-all"
              >
                Email
              </label>
              {/* Error message */}
              {validationErrors.email && (
                <div
                  id="email-error"
                  className="absolute -bottom-6 left-0 text-sm text-red-500 font-mono"
                  role="alert"
                  aria-live="assertive"
                >
                  {validationErrors.email}
                </div>
              )}
            </div>

            <div className="relative mt-8 sm:mt-14">
              <div className="relative">
                <textarea
                  id="message"
                  className={`block w-full h-auto min-h-[8rem] sm:min-h-[10rem] max-h-[20rem] sm:h-14 py-2 pl-4 pr-14 sm:pr-20 pb-8 text-base sm:text-xl font-mono outline-none border-2 rounded-[0.6rem] transition-all duration-200 resize-none bg-transparent dark:bg-transparent ${
                    validationErrors.message
                      ? 'border-red-500'
                      : 'border-yellow'
                  }`}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-label="Message"
                  aria-required="true"
                  aria-invalid={!!validationErrors.message}
                  aria-describedby={
                    validationErrors.message
                      ? 'message-error'
                      : 'message-counter'
                  }
                  maxLength={MAX_MESSAGE_LENGTH}
                  style={{
                    paddingBottom: '2rem',
                    paddingRight: '5rem',
                    backgroundColor: 'transparent',
                  }}
                />
                <label
                  htmlFor="message"
                  className="absolute top-0 left-0 h-14 flex items-center pl-4 text-lg font-mono transform transition-all pointer-events-none"
                >
                  Message
                </label>
                {/* Character counter - inside the box, bottom right corner */}
                <div
                  id="message-counter"
                  className="text-xs font-mono text-gray-400 dark:text-gray-500 pointer-events-none z-10"
                  aria-live="polite"
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '16px',
                  }}
                >
                  {messageLength}/{MAX_MESSAGE_LENGTH}
                </div>
              </div>
              {/* Error message */}
              {validationErrors.message && (
                <div
                  id="message-error"
                  className="absolute -bottom-6 left-0 text-sm text-red-500 dark:text-red-400 font-mono bg-transparent"
                  role="alert"
                  aria-live="assertive"
                  style={{ backgroundColor: 'transparent' }}
                >
                  {validationErrors.message}
                </div>
              )}
            </div>

            {/* Honeypot field - hidden from users but visible to bots */}
            <div
              style={{
                position: 'absolute',
                left: '-9999px',
                opacity: 0,
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              <label htmlFor="website">Website (leave blank)</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </RevealFade>

          {mailerResponse !== 'not initiated' &&
            (mailerResponse === 'success' ? (
              <div className="hidden">{success()}</div>
            ) : (
              <div className="hidden">{error()}</div>
            ))}
        </form>
        <RevealFade className="mt-9 mx-auto link flex justify-center">
          <button
            ref={buttonElementRef}
            className={styles.button}
            disabled={
              formData.name === '' ||
              formData.email === '' ||
              formData.message === '' ||
              isSending ||
              Object.keys(validationErrors).length > 0
                ? true
                : false
            }
            onClick={handleSubmit}
            aria-label="Send message"
            aria-busy={isSending}
          >
            <span>Send -&gt;</span>
            <span className={styles.success}>
              <svg viewBox="0 0 16 16">
                <polyline points="3.75 9 7 12 13 5"></polyline>
              </svg>
              Sent
            </span>
            <svg className={styles.trails} viewBox="0 0 33 64">
              <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
              <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
            </svg>
            <div className={styles.plane}>
              <div className={styles.left} />
              <div className={styles.right} />
            </div>
          </button>
        </RevealFade>
      </div>
      <style jsx global>{`
        input,
        label,
        textarea {
          cursor: none;
        }

        input:hover,
        textarea:hover {
          box-shadow: 0 0 0.3rem var(--accent-light);
        }

        input:active,
        input:focus,
        textarea:active,
        textarea:focus {
          box-shadow: 0 0 0.3rem #000000;
        }

        input:focus + label,
        input:valid + label,
        input:not(:placeholder-shown) + label,
        input[value]:not([value='']) + label {
          height: 50%;
          padding-left: 0;
          transform: translateY(-100%);
        }

        /* Force label to show when input has value (for invalid email) */
        input[type='email']:not(:placeholder-shown) + label,
        input[type='email'][value]:not([value='']) + label {
          height: 50%;
          padding-left: 0;
          transform: translateY(-100%);
        }

        textarea:focus + label,
        textarea:valid + label {
          height: 17%;
          padding-left: 0;
          transform: translateY(-100%);
        }

        input[type='text'],
        input[type='email'],
        textarea {
          background-color: transparent !important;
        }

        input[type='text']:focus,
        input[type='text']:active,
        input[type='text']:valid,
        input[type='text']:invalid,
        input[type='email']:focus,
        input[type='email']:active,
        input[type='email']:valid,
        input[type='email']:invalid,
        textarea:focus,
        textarea:active,
        textarea:valid,
        textarea:invalid {
          background-color: transparent !important;
        }

        .dark input[type='text'],
        .dark input[type='email'],
        .dark textarea {
          background-color: transparent !important;
        }

        .dark input[type='text']:focus,
        .dark input[type='text']:active,
        .dark input[type='text']:valid,
        .dark input[type='text']:invalid,
        .dark input[type='email']:focus,
        .dark input[type='email']:active,
        .dark input[type='email']:valid,
        .dark input[type='email']:invalid,
        .dark textarea:focus,
        .dark textarea:active,
        .dark textarea:valid,
        .dark textarea:invalid {
          background-color: transparent !important;
        }
      `}</style>
    </section>
  );
};

export default Contact;
