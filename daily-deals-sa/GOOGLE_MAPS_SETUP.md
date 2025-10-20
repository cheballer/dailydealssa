# 🗺️ Google Maps API Setup Guide

## Overview

This guide shows you how to add Google Maps autocomplete for address search in your checkout and address management pages.

---

## Step 1: Get Google Maps API Key

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create or Select Project
- Create a new project or select existing one
- Name it "Daily Deals SA" or similar

### 3. Enable APIs
Enable these APIs:
- **Maps JavaScript API** (for autocomplete)
- **Places API** (for address search)
- **Geocoding API** (for address validation)

### 4. Create API Key
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy your API key
4. (Optional) Restrict the key to your domain for security

---

## Step 2: Add API Key to Environment Variables

### For Local Development (`.env.local`):

```env
# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### For Vercel:

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add:
   - **Key**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - **Value**: Your Google Maps API key
3. Select all environments (Production, Preview, Development)
4. Save and Redeploy

---

## Step 3: Install Google Maps Script

Add to `app/layout.tsx`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

---

## Step 4: Create Address Autocomplete Component

Create `components/address-autocomplete.tsx`:

```tsx
'use client'

import { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
  }) => void;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function AddressAutocomplete({
  onAddressSelect,
  value = '',
  onChange,
  placeholder = 'Enter your address',
  label = 'Address'
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && inputRef.current) {
      // Initialize autocomplete
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['address'],
          componentRestrictions: { country: 'za' }, // Restrict to South Africa
        }
      );

      // Listen for place selection
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();

        if (place && place.address_components) {
          const address = parseGoogleAddress(place);
          onAddressSelect(address);
          
          if (onChange && inputRef.current) {
            onChange(inputRef.current.value);
          }
        }
      });
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onAddressSelect, onChange]);

  return (
    <div className="space-y-2">
      <Label htmlFor="address-autocomplete">{label}</Label>
      <Input
        ref={inputRef}
        id="address-autocomplete"
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
}

function parseGoogleAddress(place: google.maps.places.PlaceResult) {
  const address: any = {
    street: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'South Africa',
  };

  place.address_components?.forEach((component) => {
    const types = component.types;

    if (types.includes('street_number')) {
      address.street = component.long_name + ' ';
    }
    if (types.includes('route')) {
      address.street += component.long_name;
    }
    if (types.includes('locality')) {
      address.city = component.long_name;
    }
    if (types.includes('administrative_area_level_1')) {
      address.province = component.long_name;
    }
    if (types.includes('postal_code')) {
      address.postalCode = component.long_name;
    }
    if (types.includes('country')) {
      address.country = component.long_name;
    }
  });

  // Add coordinates if available
  if (place.geometry?.location) {
    address.latitude = place.geometry.location.lat();
    address.longitude = place.geometry.location.lng();
  }

  return address;
}
```

---

## Step 5: Update Checkout Page

Update `app/checkout/page.tsx` to use autocomplete:

```tsx
import { AddressAutocomplete } from '@/components/address-autocomplete';

// In your component:
const [selectedAddress, setSelectedAddress] = useState<any>(null);

<AddressAutocomplete
  onAddressSelect={(address) => {
    setSelectedAddress(address);
    setShippingInfo({
      ...shippingInfo,
      address: address.street,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
    });
  }}
  value={shippingInfo.address}
  onChange={(value) => setShippingInfo({ ...shippingInfo, address: value })}
  placeholder="Start typing your address..."
  label="Delivery Address"
/>
```

---

## Step 6: Update Address Management Page

Update `app/addresses/page.tsx` to use autocomplete:

```tsx
<AddressAutocomplete
  onAddressSelect={(address) => {
    setFormData({
      ...formData,
      address1: address.street,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
    });
  }}
  value={formData.address1}
  onChange={(value) => setFormData({ ...formData, address1: value })}
  placeholder="Enter your address..."
  label="Street Address"
/>
```

---

## Features You Get:

✅ **Address Autocomplete** - Type and select from suggestions
✅ **South Africa Only** - Restricted to ZA addresses
✅ **Auto-Fill** - Automatically fills city, province, postal code
✅ **Coordinates** - Gets lat/lng for mapping
✅ **Validation** - Only valid addresses can be selected
✅ **Save Addresses** - Save to user account
✅ **Select Saved Addresses** - Choose from saved addresses at checkout

---

## Pricing:

Google Maps API has a free tier:
- **$200 free credit per month**
- Autocomplete: $2.83 per 1,000 requests
- Places API: $17 per 1,000 requests
- Geocoding: $5 per 1,000 requests

**For most e-commerce sites, this is FREE!**

---

## Security Best Practices:

1. **Restrict API Key** to your domain
2. **Use environment variables** (never commit keys)
3. **Monitor usage** in Google Cloud Console
4. **Set up billing alerts** to avoid surprises

---

## Troubleshooting:

### "Google is not defined"
- Make sure script is loaded in `app/layout.tsx`
- Check API key is correct
- Verify Places library is loaded

### "Autocomplete not working"
- Check browser console for errors
- Verify API key has Places API enabled
- Check API key restrictions

### "Addresses not showing"
- Verify component restrictions (country: 'za')
- Check internet connection
- Verify API key is valid

---

## Next Steps:

1. Get Google Maps API key
2. Add to environment variables
3. Install the autocomplete component
4. Update checkout and address pages
5. Test address selection
6. Deploy to production

---

**That's it!** You now have professional address autocomplete! 🎉

