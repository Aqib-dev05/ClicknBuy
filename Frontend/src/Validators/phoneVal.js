const cleanPhone = (phone) => {
  // Remove all non-digits except leading +
  let cleaned = phone.trim().replace(/[^\d+]/g, "");

  // Ensure + is only at the start
  if (cleaned.includes("+")) {
    cleaned = "+" + cleaned.replace(/\+/g, "");
  }
  return cleaned;
};

const formatPhone = (phone) => {
  const cleaned = phone
  return cleaned.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
};

 const validatePhone = (phone) => {
  const cleaned = cleanPhone(phone);

  // Regex: optional +, 8-15 digits
  const regex = /^\+?\d{8,15}$/;

  return regex.test(cleaned);
};

  const validateEmail = (email) => {
  if (!email) return false;

  const cleaned = email.trim().toLowerCase();

  const regex =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  return regex.test(cleaned);
};



export {
    cleanPhone,
    formatPhone,
    validatePhone,
    validateEmail
}