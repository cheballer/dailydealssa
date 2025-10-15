import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const email = 'admin@dailydeals-sa.com'
    const password = 'admin123' // Change this in production!
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    })

    if (existingAdmin) {
      console.log('Admin user already exists!')
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email,
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date()
      }
    })

    console.log('Admin user created successfully!')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Role:', admin.role)
    console.log('\n⚠️  IMPORTANT: Change the admin password after first login!')
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
