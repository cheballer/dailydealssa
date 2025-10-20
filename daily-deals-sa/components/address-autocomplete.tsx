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

