export type ReviewRequest = {
  content: string;
  rating: number;
}

export type Checkout = {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  zip: string;
  notes: string;
  p_phone: string;
  s_phone: string;
}