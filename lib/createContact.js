import Contact from '@/lib/models/Contact';

export async function createContact(contactData) {
  try {
    const contact = await Contact.create({
      name: contactData.name.trim(),
      email: contactData.email.toLowerCase().trim(),
      phone: contactData.phone ? contactData.phone.trim() : '',
      company: contactData.company ? contactData.company.trim() : '',
      service: contactData.service ? contactData.service.trim() : '',
      message: contactData.message.trim()
    });
    return contact;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}