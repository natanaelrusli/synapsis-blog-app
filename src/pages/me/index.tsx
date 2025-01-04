import React from 'react'
import RootLayout from '@/components/layout/RootLayout'
import { withAuth } from '@/hoc/withAuth'

function ProfilePage() {
  return (
    <RootLayout>ProfilePage</RootLayout>
  )
}

export default withAuth(ProfilePage);