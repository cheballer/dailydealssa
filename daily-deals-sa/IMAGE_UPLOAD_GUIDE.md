# 📸 Image Upload Setup Guide

## ✅ What's Been Implemented

1. ✅ **@vercel/blob package installed**
2. ✅ **Upload API route created** (`/api/upload`)
3. ✅ **ImageUpload component created** (reusable)
4. ✅ **Admin-only upload protection** (only admins can upload)

---

## 🔧 Setup Steps

### Step 1: Add Environment Variable to Vercel

Go to your Vercel project settings and add:

```
Name: BLOB_READ_WRITE_TOKEN
Value: vercel_blob_rw_QOL5jHtE7B04ay7A_gVcZnOHFgG9mVNtOzklSHqx7m10Ve6
```

**Important:** Select all environments (Production, Preview, Development)

### Step 2: Redeploy

After adding the environment variable:
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"

---

## 📝 How to Use Image Upload in Product Form

### Example Usage:

```tsx
import { ImageUpload } from '@/components/image-upload'

// In your product form component:
const [imageUrl, setImageUrl] = useState('')

// In your form JSX:
<ImageUpload 
  onImageUploaded={(url) => setImageUrl(url)}
  currentImage={imageUrl}
/>

// When submitting the form, use imageUrl
```

---

## 🎯 Features

### ✅ What's Included:

- **Drag & drop upload** - Easy file selection
- **Image preview** - See image before saving
- **File validation** - Only images, max 10MB
- **Progress indicator** - Shows uploading state
- **Error handling** - User-friendly error messages
- **Remove option** - Delete uploaded image
- **Admin protection** - Only admins can upload

### 📋 Supported Formats:

- JPEG/JPG
- PNG
- WEBP
- GIF

### 📏 File Size Limit:

- Maximum: 10MB per image

---

## 🔒 Security

### Admin-Only Upload:

The upload API checks:
1. User is authenticated
2. User has admin role
3. Returns 403 Forbidden if not admin

### File Validation:

- Type validation (images only)
- Size validation (max 10MB)
- Secure filename generation

---

## 🚀 Next Steps

### 1. Add to Vercel Environment Variables

```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_QOL5jHtE7B04ay7A_gVcZnOHFgG9mVNtOzklSHqx7m10Ve6
```

### 2. Update Product Form

Add the ImageUpload component to your admin product form:

```tsx
<ImageUpload 
  onImageUploaded={(url) => formData.image = url}
  currentImage={product?.image}
/>
```

### 3. Test Upload

1. Log in as admin
2. Go to admin panel → Products
3. Add/Edit a product
4. Click "Choose Image"
5. Select an image
6. Wait for upload
7. Save product

---

## 🆘 Troubleshooting

### Upload Fails with 401/403

**Problem:** Unauthorized or Forbidden error

**Solution:**
- Make sure you're logged in as admin
- Check that BLOB_READ_WRITE_TOKEN is set in Vercel
- Redeploy after adding environment variable

### Upload Fails with 500

**Problem:** Internal server error

**Solution:**
- Check Vercel logs for detailed error
- Verify BLOB_READ_WRITE_TOKEN is correct
- Make sure @vercel/blob package is installed

### Image Not Showing

**Problem:** Image uploads but doesn't display

**Solution:**
- Check that imageUrl is saved to database
- Verify the URL is accessible (try opening in browser)
- Check browser console for errors

---

## 📊 Vercel Blob Limits

### Free Tier:
- 100GB storage
- 1TB bandwidth
- Unlimited requests

### Pricing:
- After free tier: $0.15/GB storage
- After free tier: $0.40/GB bandwidth

---

## 🎉 You're Ready!

Once you:
1. Add `BLOB_READ_WRITE_TOKEN` to Vercel
2. Redeploy
3. Update your product form with ImageUpload component

You'll be able to upload product images directly from the admin panel!

---

## 📝 Quick Reference

**Upload API:** `/api/upload`  
**Component:** `@/components/image-upload`  
**Package:** `@vercel/blob`  
**Token:** `BLOB_READ_WRITE_TOKEN`  

---

**Start uploading images!** 📸




