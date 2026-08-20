export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone.replace(/\D/g, '').slice(-10));
};

export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '').trim();
};

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const generateOrderNumber = () => {
  const date = new Date();
  const prefix = 'AAK';
  const timestamp = date.getFullYear().toString().slice(-2) +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

export const calculateTax = (amount, rate = 0.03) => Math.round(amount * rate);

export const calculateShipping = (subtotal, pincode) => {
  if (subtotal >= 999) return 0;
  const metroPincodes = ['110', '400', '560', '600', '500', '700'];
  const prefix = pincode?.substring(0, 3);
  if (metroPincodes.includes(prefix)) return 49;
  return 79;
};
