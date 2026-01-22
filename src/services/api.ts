const API_URL = 'http://localhost:3002/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const createProduct = async (productData: any) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
};

export const fetchDeliveries = async () => {
  const response = await fetch(`${API_URL}/deliveries`);
  if (!response.ok) throw new Error('Failed to fetch deliveries');
  return response.json();
};

export const fetchDeliveryById = async (id: string) => {
  const response = await fetch(`${API_URL}/deliveries/${id}`);
  if (!response.ok) throw new Error('Failed to fetch delivery details');
  return response.json();
};

export const createDelivery = async (data: any) => {
  const response = await fetch(`${API_URL}/deliveries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Create delivery error details:', errorData);
    throw new Error(errorData.message || 'Failed to create delivery');
  }
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const fetchAssets = async () => {
  const response = await fetch(`${API_URL}/assets`);
  if (!response.ok) throw new Error('Failed to fetch assets');
  return response.json();
};