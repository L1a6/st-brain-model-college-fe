import ContactForm from "../_components/contact-form"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 py-5 text-center text-3xl font-bold">Contact Us</h1>
      <p className="mb-6">
        Fill out the form below and we will get back to you as soon as possible.
      </p>
      <ContactForm />
    </div>
  )
}
